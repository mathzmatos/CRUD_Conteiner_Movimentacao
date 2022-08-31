
const modalconteiner = document.querySelector('#modal-conteiner')
const modalmovimentacao = document.querySelector('#modal-movimentacao')

const tbodyConteiner = document.querySelector('.tbody-conteiner')
const tbodyMovimentacao = document.querySelector('.tbody-movimentacao')

const sCliente = document.querySelector('#m-cliente')
const sConteiner = document.querySelector('#m-num')
const sTipo = document.querySelector('#m-tipo')
const sStatus = document.querySelector('#m-status')
const sCategoria = document.querySelector('#m-categoria')

const sMov = document.querySelector('#m-mov')
const sInicio = document.querySelector('#m-inicio')
const sFim = document.querySelector('#m-fim')

const btnSalvarConteiner = document.querySelector('#btnSalvarConteiner')
const btnSalvarMovimentacao = document.querySelector('#btnSalvarMovimentacao')

const btnCancelarConteiner = document.querySelector('#btnCancelarConteiner')
const btnCancelarMovimentacao = document.querySelector('#btnCancelarMovimentacao')

let itens
let id


// Conteiner

function openConteinerModal(edit = false, index = 0) {
  modalconteiner.classList.add('active')

  modalconteiner.onclick = e => {
    if (e.target.className.indexOf('modal-box') !== -1) {
      modalconteiner.classList.remove('active')
    }
  }

  if (edit) {
    sCliente.value = itens[index].cliente
    sConteiner.value = itens[index].conteiner
    sTipo.value = itens[index].tipo
    sStatus.value = itens[index].status
    sCategoria.value = itens[index].categoria

    id = index
  } else {
    sCliente.value = ''
    sConteiner.value = ''
    sTipo.value = ''
    sStatus.value = ''
    sCategoria.value = ''
  }

}


function editConteinerItem(index) {

  openConteinerModal(true, index)
}

function deleteConteinerItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadConteinerItens()
}

function insertConteinerItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.cliente}</td>
    <td>${item.conteiner}</td>
    <td>${item.tipo}</td>
    <td>${item.status}</td>
    <td>${item.categoria}</td>

    <td class="acao">
      <button onclick="editConteinerItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteConteinerItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbodyConteiner.appendChild(tr)
}


btnSalvarConteiner.onclick = e => {

  if (sCliente.value == '' || sConteiner.value == '' || sTipo.value == '' || sStatus.value == '' || sCategoria.value == '') {
    return
  }

  
  e.preventDefault();

  if (id !== undefined) {
    itens[id].cliente = sCliente.value
    itens[id].conteiner = sConteiner.value
    itens[id].tipo = sTipo.value
    itens[id].status = sStatus.value
    itens[id].categoria = sCategoria.value


  } 
  else 
  {
    itens.push({ 'cliente': sCliente.value, 'conteiner': sConteiner.value, 'tipo': sTipo.value, 'status': sStatus.value, 'categoria': sCategoria.value })
  }

  setItensBD()

  modalconteiner.classList.remove('active')
  loadConteinerItens()
  id = undefined
}

function loadConteinerItens() {
  itens = getItensBD()
  tbodyConteiner.innerHTML = ''

  itens.forEach((item, index) => {
    insertConteinerItem(item, index)
  })

}


btnCancelarConteiner.onclick = e => {
  e.preventDefault()
  const modals = document.querySelectorAll(".modal-box")

  for (let modal of modals) {
    modal.classList.remove('active')
  }
}


// Soma das Importações e Exportações

function soma()
{
  let 
}





// Movimentação

function openMovimentacaoModal(edit = false, index = 0) {
  modalmovimentacao.classList.add('active')

  modalmovimentacao.onclick = e => {
    if (e.target.className.indexOf('modal-box') !== -1) {
      modalmovimentacao.classList.remove('active')
    }
  }

  if (edit) {
    sConteiner.value = itens[index].conteiner
    sMov.value = itens[index].mov
    sInicio.value = itens[index].inicio
    sFim.value = itens[index].fim


    id = index

  } else {
    sConteiner.value = ''
    sMov.value = ''
    sInicio.value = ''
    sFim.value = ''
   
  }

}


function editMovimentacaoItem(index) {

  openMovimentacaoModal(true, index)
}


function deleteMovimentacaoItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadMovimentacaoItens()
}



function insertMovimentacaoItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.conteiner}</td>
    <td>${item.mov}</td>
    <td>${item.inicio}</td>
    <td>${item.fim}</td>

    <td class="acao">
      <button onclick="editMovimentacaoItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteMovimentacaoItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbodyMovimentacao.appendChild(tr)
}

btnSalvarMovimentacao.onclick = e => {

  if (sConteiner.value == '' || sMov.value == '' || sInicio.value == '' || sFim.value == '') {
    return
  }

  
  e.preventDefault();

  if (id !== undefined) {
    itens[id].conteiner = sConteiner.value
    itens[id].mov = sMov.value
    itens[id].inicio = sInicio.value
    itens[id].fim = sFim.value
    
  } 
  else 
  {
    itens.push({'conteiner': sConteiner.value, 'movimentacao': sMov.value, 'inicio': sInicio.value, 'fim': sFim.value})
  }

  setItensBD()

  modalmovimentacao.classList.remove('active')
  loadMovimentacaoItens()
  id = undefined
}

function loadMovimentacaoItens() {
  itens = getItensBD()
  tbodyMovimentacao.innerHTML = ''

  itens.forEach((item, index) => {
    insertMovimentacaoItem(item, index)
  })

}

btnCancelarMovimentacao.onclick = e => {
  e.preventDefault()
  const modals = document.querySelectorAll(".modal-box")

  for (let modal of modals) {
    modal.classList.remove('active')
  }
}



///





const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadConteinerItens()
loadMovimentacaoItens()