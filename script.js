const form = document.getElementById('form')
const input = document.getElementById('input')
const FocusFlowUL = document.getElementById('FocusFlow')

const FocusFlow = JSON.parse(localStorage.getItem('FocusFlow'))

if(FocusFlow) {
    FocusFlow.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        FocusFlowUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    FocusFlowEl = document.querySelectorAll('li')

    const FocusFlow = []

    FocusFlowEl.forEach(todoEl => {
        FocusFlow.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('FocusFlow', JSON.stringify(FocusFlow))
}