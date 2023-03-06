const form = document.querySelector('#form-itens')
const valueInpt = document.querySelector('#receber-item')
const ulElemento = document.querySelector('#lista-de-itens')
const compraNoCarrinho = document.querySelector('#itens-comprados')
const guardaItens = localStorage.getItem('listaCompras')

let listaCompras = [];
let editaItem;

function guardarItemLocaStorage() {
    localStorage.setItem('listaCompras', JSON.stringify(listaCompras))
}

 if (guardaItens) {
    listaCompras = JSON.parse(guardaItens)
    //console.log(listaCompras)
    imprimirTela()
 } else {
    listaCompras = [];
 }

form.addEventListener('submit', (e) => {
    e.preventDefault()

    valueInpt.focus()
    addItens()
    imprimirTela()
})

function addItens() {
    const erro = document.querySelector('span')

    const valoInput = valueInpt.value;
    const verificarItem = listaCompras.some(e=> e.item.toUpperCase() === valoInput.toUpperCase())

    if (verificarItem) {
        erro.innerHTML = '<i class="fa-sharp fa-solid fa-circle-exclamation"> Ops! colocou nome repetido na lista</i>'
    } else {
        erro.innerHTML = '';
        listaCompras.push({
            item: valoInput,
            valor: false
        })
    } 
    valueInpt.value = "";
}

function imprimirTela() {
    ulElemento.innerHTML = "";
    compraNoCarrinho.innerHTML = "";

    listaCompras.forEach((evento, index) =>{

        if (evento.valor) {
            compraNoCarrinho.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${evento.item}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }else {
            ulElemento.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${evento.item}" ${index !== Number(editaItem) ? 'disabled' : ''}></input>
                </div>
                <div>
                ${index === Number(editaItem) ? '<button onClick="salvaItem()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }
        guardarItemLocaStorage()
    })

    const checked = document.querySelectorAll('input[type=checkbox]')
    const deletaElement = document.querySelectorAll('.deletar')
    const itensEditado = document.querySelectorAll('.editar')
    

    checked.forEach(e => {
        e.addEventListener('click', (opcao) => {
            let inputcheckd = opcao.target.parentElement.parentElement.getAttribute('data-value')
            listaCompras[inputcheckd].valor = opcao.target.checked
            imprimirTela()
        })
    })

    deletaElement.forEach(e => {
        e.addEventListener('click', (del) => {
            inputcheckd = del.target.parentElement.parentElement.getAttribute('data-value')
            listaCompras.splice(inputcheckd,1)
            imprimirTela()
            guardarItemLocaStorage()
        })
    })

    itensEditado.forEach(i => {
        i.addEventListener('click', (edit) => {
            editaItem = edit.target.parentElement.parentElement.getAttribute('data-value')
            imprimirTela()
        })
    })

}

function salvaItem() {
    const salvaEdita = document.querySelector(`[data-value="${editaItem}"] input[type="text"]`)
    listaCompras[editaItem].item = salvaEdita.value 
    editaItem -= 1;
    imprimirTela()
}