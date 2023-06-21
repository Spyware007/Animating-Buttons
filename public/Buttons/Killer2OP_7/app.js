document.querySelectorAll('.donate').forEach(function(elem) {

    const inputElement = elem.querySelector('input');
    const form = elem.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        elem.classList.add('submit');
    });

    document.addEventListener('click', e => {
        if(e.target === form || form.contains(e.target)) {
            return;
        }
        if(e.target === elem || elem.contains(e.target)) {
            if(!elem.classList.contains('submit')) {
                if(elem.classList.contains('open')) {
                    elem.classList.add('submit');
                } else {
                    elem.classList.add('open');
                    setTimeout(() => {
                        inputElement.selectionStart = inputElement.selectionEnd = 10000;
                        inputElement.focus();
                    }, 0);
                }
            }
            return;
        }
        if(!elem.classList.contains('submit')) {
            elem.classList.remove('open');
        }
    });

});
