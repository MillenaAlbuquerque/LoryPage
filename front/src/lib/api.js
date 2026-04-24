const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ;

const loadRecaptchaScript = () => {
  if (window.grecaptcha) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="recaptcha"]');
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        resolve();
      } else {
        existing.addEventListener("load", resolve);
        existing.addEventListener("error", () => reject(new Error("Erro ao carregar reCAPTCHA")));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject(new Error("Erro ao carregar reCAPTCHA"));
    document.body.appendChild(script);
  });
};

const getInitToken = async () => {
  // VERIFICA ANTES
  const exp = sessionStorage.getItem('api_token_exp');
  const storedToken = sessionStorage.getItem('api_token');

  if (exp && Date.now() < Number(exp) && storedToken) {
    return storedToken;
  }

  // OBTÉM NOVO TOKEN
  let response;
  try {
    response = await fetch(`${BASE_URL}/init`);
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
  }
  if (!response.ok) {
    throw new Error("Falha ao obter token inicial");
  }
  const data = await response.json();
  if (!data.token) {
    throw new Error("Token não retornado pelo backend");
  }

  // ARMAZENA TOKEN E EXPIRAÇÃO
  sessionStorage.setItem('api_token', data.token);
  sessionStorage.setItem('api_token_exp', Date.now() + (data.expires_in || 600) * 1000); 

  return data.token;
};

const getRecaptchaToken = async () => {
  await loadRecaptchaScript();

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA não está disponível no browser");
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
        .then(resolve)
        .catch(reject);
    });
  });
};

const buildHeaders = (token, recaptchaToken) => ({
  Authorization: `Bearer ${token}`,
  "X-Recaptcha-Token": recaptchaToken,
  "Content-Type": "application/json",
});

const handleApiError = async (response) => {
  let errorMessage;
  try {
    const errorData = await response.json();
    errorMessage = errorData.erro;
  } catch {
    errorMessage = null;
  }

  switch (response.status) {
    case 401:
      throw new Error("Sessão inválida. Recarregue a página e tente novamente.");
    case 403:
      if (errorMessage === 'ReCAPTCHA inválido') {
        throw new Error("Verificação de segurança falhou. Tente novamente.");
      }
      throw new Error(errorMessage || "Acesso negado.");
    case 429:
      throw new Error("Muitas tentativas. Aguarde um momento e tente novamente.");
    case 500:
      throw new Error(errorMessage || "Erro interno no servidor. Tente novamente mais tarde.");
    case 503:
      throw new Error(errorMessage || "Serviço temporariamente indisponível. Tente novamente em instantes.");
    default:
      throw new Error(errorMessage || `Erro inesperado (${response.status}). Tente novamente.`);
  }
};

const makeAuthenticatedRequest = async (url, options = {}) => {
  let token, recaptchaToken;

  token = await getInitToken();
  recaptchaToken = await getRecaptchaToken();

  let response;
  try {
    const headers = buildHeaders(token, recaptchaToken);
    response = await fetch(url, { ...options, headers });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
  }

  if (response.status === 403) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      throw new Error("Acesso negado.");
    }

    if (errorData.erro === 'Token inválido ou expirado') {
      sessionStorage.removeItem('api_token');
      sessionStorage.removeItem('api_token_exp');

      const newToken = await getInitToken();
      const newRecaptchaToken = await getRecaptchaToken();

      try {
        const newHeaders = buildHeaders(newToken, newRecaptchaToken);
        return await fetch(url, { ...options, headers: newHeaders });
      } catch {
        throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
      }
    }

    if (errorData.erro === 'ReCAPTCHA inválido') {
      throw new Error("Verificação de segurança falhou. Tente novamente.");
    }

    throw new Error(errorData.erro || "Acesso negado.");
  }

  return response;
};

export const bookAppointment = async ({ data, hora, nome, email, online, phone, duracao }) => {
  const response = await makeAuthenticatedRequest(`${BASE_URL}/agendar`, {
    method: "POST",
    body: JSON.stringify({ data, hora, nome, email, online, phone, duracao }),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  const payload = await response.json();
  return {
    evento: payload,
    aviso: payload.aviso || null,
  };
};

export const getAvailableSlots = async () => {
  const response = await makeAuthenticatedRequest(`${BASE_URL}/`);

  if (!response.ok) {
    await handleApiError(response);
  }

  const data = await response.json();
  if (!data.disponiveis) {
    throw new Error("Formato de resposta inválido");
  }

  return data.disponiveis;
};
