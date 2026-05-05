const resultContainer = document.getElementById("result");
const pageLoadInfo = document.getElementById("pageLoadInfo");

(function countPageLoads() {
    const storageKey = "pageLoadCount";
    let count = Number(localStorage.getItem(storageKey)) || 0;
    count += 1;
    localStorage.setItem(storageKey, count);

    const message = `Вы загрузили/обновили эту страницу ${count} раз(а).`;
    pageLoadInfo.textContent = message;
    alert(message);
})();
//immediately invoked function expression
function clearResult() {
    resultContainer.innerHTML = "";
}

function askFiveImageUrls() {
    const urls = [];

    for (let i = 1; i <= 5; i++) {
        const url = prompt(`Введите URL картинки №${i}:`);

        if (url === null) {
            return null;
        }

        urls.push(url.trim());
    }

    return urls;
}

function createErrorParagraph() {
    const p = document.createElement("p");
    p.textContent = "Can’t load image";
    return p;
}

function createImageElement(url) {
    return new Promise((resolve) => {
        const img = document.createElement("img");

        img.onload = () => resolve(img);
        img.onerror = () => resolve(createErrorParagraph());

        img.src = url;
        img.alt = "Loaded image";
    });
}

function appendElement(element) {
    resultContainer.appendChild(element);
}

function loadImagesKeepOrderPromises() {
    clearResult();

    const urls = askFiveImageUrls();
    if (!urls) return;

    const promises = urls.map((url) => createImageElement(url));

    Promise.all(promises)
        .then((elements) => {
            elements.forEach((element) => appendElement(element));
        })
        .catch(() => {
            alert("Произошла ошибка при загрузке изображений");
        });
}

function loadImagesNoOrderPromises() {
    clearResult();

    const urls = askFiveImageUrls();
    if (!urls) return;

    urls.forEach((url) => {
        createImageElement(url)
            .then((element) => {
                appendElement(element);
            })
            .catch(() => {
                appendElement(createErrorParagraph());
            });
    });
}

async function loadImagesKeepOrderAsync() {
    clearResult();

    const urls = askFiveImageUrls();
    if (!urls) return;

    try {
        const elements = await Promise.all(
            urls.map((url) => createImageElement(url))
        );

        elements.forEach((element) => appendElement(element));
    } catch (error) {
        alert("Произошла ошибка при загрузке изображений");
    }
}

async function loadImagesNoOrderAsync() {
    clearResult();

    const urls = askFiveImageUrls();
    if (!urls) return;

    urls.forEach(async (url) => {
        try {
            const element = await createImageElement(url);
            appendElement(element);
        } catch (error) {
            appendElement(createErrorParagraph());
        }
    });
}

const BLOCKED_COUNTRIES = [
    "Россия",
    "Беларусь",
    "Афганистан",
    "Китай",
    "Венесуэла",
    "Иран",
    "Russia",
    "Belarus",
    "Afghanistan",
    "China",
    "Venezuela",
    "Iran"
];

async function fetchIpInfo(ip) {
    const response = await fetch(`https://json.geoiplookup.io/${encodeURIComponent(ip)}`);

    if (!response.ok) {
        throw new Error("Сервис недоступен");
    }

    const data = await response.json();
    return data;
}

async function checkIpAddresses() {
    const ips = [];

    for (let i = 1; i <= 5; i++) {
        const ip = prompt(`Введите IP-адрес №${i}:`);

        if (ip === null) return;

        ips.push(ip.trim());
    }

    try {
        const results = await Promise.all(ips.map((ip) => fetchIpInfo(ip)));

        const hasBlockedCountry = results.some((item) => {
            const country = item.country_name || "";
            return BLOCKED_COUNTRIES.includes(country);
        });

        if (hasBlockedCountry) {
            alert("Our services are not available in your country");
        } else {
            alert("Welcome to our website!");
        }
    } catch (error) {
        alert("Сервис проверки IP недоступен");
    }
}
//8.8.8.8 ok
//77.88.8.8 ne ok
//178.22.122.100 ne ok