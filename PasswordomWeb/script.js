document.addEventListener('DOMContentLoaded', () => {
    const lengthEl = document.getElementById("length");
    const lowercaseEl = document.getElementById("lowercase");
    const uppercaseEl = document.getElementById("uppercase");
    const numberEl = document.getElementById("number");
    const symbolEl = document.getElementById("symbol");
    const generateEl = document.getElementById("generate");
    const copyEl = document.getElementById("copy");
    const resultEl = document.getElementById("result");
    copyEl.addEventListener("click", () => {
        if (resultEl.value) {
            navigator.clipboard.writeText(resultEl.value).then(() => {
            }).catch(err => {
                console.error("Failed to copy: ", err);
            });
        }
    });
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});



function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }]
        .filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}
});
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol(){
     const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const strengthResult = document.getElementById('strengthResult');

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value.trim();
        const strength = checkPasswordStrength(password);

        strengthResult.innerText = strength.label;
        strengthResult.className = '';
        strengthResult.classList.add(strength.class);
    });

    const defaultPasswords = [
        'password', 'pass', 'root', 'qwerty', 'qwerty123', '123qwe', 'welcome',
        'abcd', 'abc123', 'iloveyou', 'admin', 'user', 'usr', '666', '1488',
        '1337', '69696969', '11111111', '123', '1234', '123456', '12345',
        '1234567', '12345678', '123456789'
    ];

    function checkPasswordStrength(password) {
        if (!password) {
            return { label: 'None', class: 'none' }; // Відсутній пароль
        }

        if (defaultPasswords.includes(password.toLowerCase())) {
            return { label: 'Default password', class: 'default' }; // Дефолтний пароль
        }

        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 10) strength++;
        if (password.length >= 12) strength++;
        if (password.length >= 14) strength++;

        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[\W_]/.test(password)) strength++;

        if (strength <= 2) {
            return { label: 'Weak', class: 'weak' };
        } else if (strength <= 4) {
            return { label: 'Normal', class: 'normal' };
        } else if (strength <= 6) {
            return { label: 'Hard', class: 'hard' };
        } else {
            return { label: 'Strong', class: 'strong' };
        }
    }
});