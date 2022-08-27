// Doi tuong validator
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Ham thuc hien validate
    function validate (inputElement, rule) {

        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lay ra cac rules cua selector
        var rules = selectorRules[rule.selector];

        // Lap qua tung rule & kiem tra
        // Neu co loi thi dung kiem tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage;
    }

    // Lay Element cua form
    var formElement = document.querySelector(options.form);
    if (formElement) {

        // Khi submit form
        formElement.onsubmit = event => {
            event.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rule và validate
            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        values[input.name] = input.value;
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                } 
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(rule => {

            // Luu lai cac rules cho moi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                // Xu ly truong hop blur khoi input
                inputElement.onblur = () => validate(inputElement, rule);

                // Xu ly moi khi nguoi dung nhap vao input
                inputElement.oninput = () => {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

// Định nghĩa các rules
// Nguyen Tac cua cac rules:
// 1. Khi co loi => tra ra message loi
// 2. Khi hop le => khong tra ra cai gi ca (undefined)

Validator.isRequired = (selector, message) => {
    return {
        selector,
        test: value => value.trim() ? undefined : message || 'Vui lòng nhập trường này!' // method Trim loại bỏ các dấu cách
    }
}

Validator.isEmail = (selector, message) => {
    return {
        selector,
        test: value => {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
}

// password rule
Validator.minLength = (selector, min, message) => {
    return {
        selector,
        test: value => {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}

Validator.isConfirmed = (selector, getConfirmValue, message) => {
    return {
        selector,
        test: value => {
            return value === getConfirmValue() ? undefined : message || 'Gía trị nhập vào không chính xác';
        }
    }
}