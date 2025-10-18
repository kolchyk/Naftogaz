# 🔍 Анализ Возможных Причин Краша WaterMeterOCR

**Дата**: October 18, 2025  
**Статус**: Анализ без устройства/эмулятора  
**Проект**: WaterMeterOCR (React Native + ML Kit)

---

## 📋 Требования для запуска отладки

### Обязательные компоненты:
1. ❌ **Android Emulator** - Не найдено
2. ❌ **ADB** - Не найдено в PATH
3. ❌ **Запущенное устройство/эмулятор** - Нет подключения

---

## 🔧 Возможные причины краша приложения

### 1️⃣ **Проблемы с камерой** (ВЕРОЯТНО)
```
Причина: react-native-camera требует разрешений и инициализации
Синдром краша: App crashes immediately after launch
Логи: "Camera permission denied" или "Camera not initialized"

Решение:
✓ Проверить permissions в AndroidManifest.xml
✓ Запросить runtime permissions
✓ Инициализировать камеру после получения разрешений
```

### 2️⃣ **Проблемы с ML Kit** (ВЕРОЯТНО)
```
Причина: ML Kit требует Google Play Services
Синдром краша: Crash при попытке использовать TextRecognition API
Логи: "ML Kit Text Recognition not available"

Решение:
✓ Убедиться, что Google Play Services установлены
✓ Проверить метаданные ML Kit в AndroidManifest.xml
✓ Добавить обработку исключений для ML Kit инициализации
```

### 3️⃣ **Native Modules не загружены** (ВОЗМОЖНО)
```
Причина: Native библиотеки не нашлись или ABI конфликт
Синдром краша: UnsatisfiedLinkError или Module not found
Логи: "Cannot load native library"

Решение:
✓ Проверить что все ABIs скомпилированы
✓ Убедиться что приложение использует одну архитектуру
✓ Проверить CMake сборку
```

### 4️⃣ **Ошибки JavaScript/TypeScript** (ВОЗМОЖНО)
```
Причина: Ошибка в App.tsx или других компонентах при запуске
Синдром краша: Red screen с ошибкой JavaScript
Логи: "Error: ... is not a function"

Решение:
✓ Проверить App.tsx
✓ Проверить инициализацию navigation
✓ Добавить error boundary
✓ Проверить консоль React Native
```

### 5️⃣ **Проблемы с памятью** (МАЛОВЕРОЯТНО)
```
Причина: Недостаточно памяти для загрузки всех компонентов
Синдром краша: Out of Memory при запуске
Логи: "OutOfMemoryError"

Решение:
✓ Уменьшить размер приложения
✓ Оптимизировать использование памяти
✓ Удалить неиспользуемые ресурсы
```

---

## 📊 Диагностика логов

### Как получить логи при отсутствии эмулятора:

#### Вариант 1: Статический анализ кода
```bash
cd /Users/serhii/Github/NaftogazApp/WaterMeterOCR
npx react-native doctor
```

#### Вариант 2: Создать эмулятор
```bash
# Если Android Studio установлена:
open -a Android\ Studio

# Или через CLI:
$ANDROID_SDK_HOME/cmdline-tools/latest/bin/sdkmanager \
  "system-images;android-31;google_apis;arm64-v8a"

avdmanager create avd -n TestEmulator \
  -k "system-images;android-31;google_apis;arm64-v8a"
```

#### Вариант 3: Использовать физическое устройство
```bash
# Подключить Android устройство через USB
# Включить USB отладку в Developer Options
adb install /path/to/app-mlkit-debugOptimized.apk
adb logcat
```

---

## 🔎 Проверка кода на потенциальные проблемы

### App.tsx - основной компонент
