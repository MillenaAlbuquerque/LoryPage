import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "../../lib/utils";

const CarouselContext = React.createContext(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);
	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}
	return context;
}

const Carousel = React.forwardRef(
	(
		{
			orientation = "horizontal",
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y",
			},
			plugins
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);

		const onSelect = React.useCallback((api) => {
			if (!api) return;
			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext]
		);

		React.useEffect(() => {
			if (!api || !setApi) return;
			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) return;
			onSelect(api);
			api.on("reInit", onSelect);
			api.on("select", onSelect);
			return () => {
				api?.off("select", onSelect);
			};
		}, [api, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api,
					opts,
					orientation:
						orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	}
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();
	if (orientation === "vertical") {
		return (
			<div ref={carouselRef} className={cn("overflow-hidden", className)}>
				<div
					ref={ref}
					className="flex -mt-1 flex-col h-full"
					{...props}
				/>
			</div>
		);
	}
	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cn("flex -ml-4", className)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();
	return (
		<div
			ref={ref}
			role="group"
			aria-roledescription="slide"
			className={cn(
				"shrink-0 grow-0",
				orientation === "horizontal" ? "min-w-0 basis-full pl-4" : "pt-1",
				className
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();
	return (
		<button
			ref={ref}
			className={cn(
				"absolute h-8 w-8 rounded-full flex items-center justify-center border border-gray-300 bg-white shadow-sm hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-30 transition",
				orientation === "horizontal"
					? "-left-12 top-1/2 -translate-y-1/2"
					: "-top-10 left-1/2 -translate-x-1/2 rotate-90",
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft className="h-4 w-4" />
			<span className="sr-only">Slide anterior</span>
		</button>
	);
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();
	return (
		<button
			ref={ref}
			className={cn(
				"absolute h-8 w-8 rounded-full flex items-center justify-center border border-gray-300 bg-white shadow-sm hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-30 transition",
				orientation === "horizontal"
					? "-right-12 top-1/2 -translate-y-1/2"
					: "-bottom-10 left-1/2 -translate-x-1/2 rotate-90",
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight className="h-4 w-4" />
			<span className="sr-only">Próximo slide</span>
		</button>
	);
});
CarouselNext.displayName = "CarouselNext";

export {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
};
