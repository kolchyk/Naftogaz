#!/bin/bash

# ============================================
# WaterMeterOCR - Сборка и Тест Команды
# ============================================

# 1. Установка зависимостей
echo "📦 Установка npm зависимостей..."
npm install

# 2. Запуск Jest тестов (JavaScript/TypeScript)
echo "🧪 Запуск Jest unit тестов..."
npm test

# 3. Переход в Android директорию
cd android

# 4. Сборка приложения с ML Kit
echo "🔨 Сборка ML Kit Debug варианта..."
./gradlew buildMlkitDebug

# 5. Unit тесты Android
echo "🧪 Запуск Android unit тестов..."
./gradlew testMlkitDebugUnitTest

# 6. Integration тесты (требует эмулятор/устройство)
echo "🧪 Запуск Android integration тестов..."
./gradlew connectedMlkitDebugAndroidTest

# 7. Установка на устройство (требует подключенное устройство)
echo "📱 Установка APK на устройство..."
./gradlew installMlkitDebug

# 8. Release сборка
echo "📦 Сборка Release варианта..."
./gradlew buildMlkitRelease

# Альтернативные команды:

# Только сборка без тестов
# ./gradlew buildMlkitDebug -x test

# Очистка и перестроение
# ./gradlew clean buildMlkitDebug

# С детальным логированием
# ./gradlew buildMlkitDebug --info

# Проверка зависимостей
# ./gradlew dependencies

# Запуск приложения на эмуляторе (из корня проекта)
# npm run android

echo "✅ Все команды выполнены!"
