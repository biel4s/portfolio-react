import { useEffect, useState } from "react";

const useIntersection = (refs, options) => {
	const [intersecting, setIntersecting] = useState([]);
	console.log("isVisible", intersecting);

	useEffect(() => {
		const observers = refs.map((ref) => {
			return new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting && !ref.current.visible) {
					ref.current.visible = true;
					setIntersecting((prevElements) => [
						...prevElements,
						ref.current,
					]);
				} else if (!entry.isIntersecting && ref.current.visible) {
					ref.current.visible = false;
					setIntersecting((prevElements) =>
						prevElements.filter(
							(element) => element !== ref.current
						)
					);
				}
			}, options);
		});

		refs.forEach((ref, index) => {
			if (ref.current) {
				ref.current.visible = false;
				observers[index].observe(ref.current);
			}
		});

		return () => {
			// refs.forEach((ref, index) => {
			// 	if (ref.current) {
			// 		observers[index].unobserve(ref.current);
			// 	}
			// })
			observers.forEach((observer) => observer.disconnect());
		};
	}, [refs, options]);

	return intersecting;
};

export default useIntersection;

// const observerCallback = (entries, observer) => {
// 	entries.forEach((entry) => {
// 		if (entry.isIntersecting) setIsVisible(entry.isIntersecting);
// 		if (entry.isIntersecting) observer.unobserve(entry.target);
// 	});

// 	//setIsVisible(entry.isIntersecting);
// 	//if (entry.isIntersecting) observer.unobserve(entry.target);
// };

// const optionsMemo = useMemo(() => {
// 	return options;
// }, [options]);

// useEffect(() => {
// 	const observer = new IntersectionObserver(
// 		([entry]) => setIsVisible(entry.isVisible),
// 		{ rootMargin: "-100px" }
// 	);

// 	observer.observe(ref.current);

// 	return () => observer.disconnect();
// }, [isVisible]);

// useEffect(() => {
// 	if (isVisible) {
// 		ref.current.querySelectorAll("div").forEach((el) => {
// 			el.classList.add("show");
// 		});
// 	} else {
// 		ref.current.querySelectorAll("div").forEach((el) => {
// 			el.classList.add("hidden");
// 		});
// 	}
// }, [isVisible]);