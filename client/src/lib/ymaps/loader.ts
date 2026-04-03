let promise: Promise<typeof ymaps3> | null = null;

export function loadYmaps(): Promise<typeof ymaps3> {
  if (promise) return promise;

  promise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${import.meta.env.VITE_YAPI}&lang=ru_RU`;
    script.onload = () => resolve(ymaps3);

    document.head.appendChild(script);
  });

  return promise;
}
