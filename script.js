// Инициализация объекта распознавания речи и синтеза речи
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'ru-RU';
var speechSynthesis = window.speechSynthesis;

// Событие, вызываемое при успешном распознавании речи
recognition.onresult = function(event) {
    var result = event.results[0][0].transcript;
    console.log("Вы сказали: " + result); // Вывод в консоль
    var responseElement = document.getElementById("response");
    
    // Обработка распознанной речи и генерация ответа
    var response = generateResponse(result);
    
    // Вывод ответа текстом
    responseElement.innerHTML = response;
    
    // Синтез ответа речью
    var utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
    
    // Проверка для перенаправления на YouTube
    if (result.toLowerCase().includes("youtube")) {
        window.location.href = "https://youtube.com";
    }
};

// Функция для запуска распознавания речи
function startListening() {
    recognition.start();
}

// Функция для получения погоды
function getWeather() {
    var cityName = document.getElementById("cityName").value;
    var apiKey = 'bd5e378503939ddaee76f12ad7a97608';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=ru`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var weatherDescription = data.weather[0].description;
            var temperature = Math.round(data.main.temp - 273.15); // Конвертирование из Кельвинов в градусы Цельсия
            var response = `Погода в городе ${cityName}: ${weatherDescription}. Температура: ${temperature}°C.`;
            
            // Вывод ответа текстом
            var responseElement = document.getElementById("response");
            responseElement.innerHTML = response;
            
            // Синтез ответа речью
            var utterance = new SpeechSynthesisUtterance(response);
            speechSynthesis.speak(utterance);
        })
        .catch(error => console.log('Ошибка:', error));
}

// Функция для генерации ответа на основе вопроса
function generateResponse(question) {
    if (question.toLowerCase().includes("привет") || question.toLowerCase().includes("здравствуй") || 
        question.toLowerCase().includes("добрый день") || question.toLowerCase().includes("здравствуйте")) {
        return "Привет! Чем могу помочь?";
    } else if (question.toLowerCase().includes("как дела")) {
        return "У меня всё отлично, спасибо за ваш интерес!";
    } else if (question.toLowerCase().includes("ты кто")) {
        return "Я - ваш персональный помощник, Джарвис.";
    } else if (question.toLowerCase().includes("youtube")) {
        window.location.href = "https://youtube.com";
        return "Делаю";
    } else if (question.toLowerCase().includes("telegram")) {
        window.location.href = "http://t.me/PythonA";
        return "Делаю";
    } else if (question.toLowerCase().includes("помощь")) {
        return "Вы можете спросить меня о погоде, а также поздороваться или узнать, как у меня дела.";
    } else if (question.toLowerCase().includes("погода") || question.toLowerCase().includes("пагода")) {
        // Показываем дополнительное поле ввода для названия города
        document.getElementById("weatherInput").style.display = "block";
        return "Хорошо, назовите город, чтобы получить погоду.";
    } else if (question.toLowerCase().includes("откуда я тебя понял")) {
        return "Я - ваш персональный помощник, Джарвис. Я понимаю вашу речь благодаря технологии распознавания речи.";
    } else {
        return "Простите, я не могу понять ваш запрос.";
    }
}