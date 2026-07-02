let input = document.querySelector(".input-tugas")
let tombolTambah = document.querySelector(".tambah-tugas")
let list = document.querySelector(".list")
let listGaada = document.querySelector(".list-gaada")


function simpanData() {
  let semuaTugas = [];
  let semuaItem = document.querySelectorAll(".isi-list");
  
  semuaItem.forEach(function(item) {
    let teks = item.querySelector("p").textContent;
    let apakahSelesai = item.classList.contains("checked"); 
    
    semuaTugas.push({
      teks: teks,
      selesai: apakahSelesai
    });
  });
  localStorage.setItem("todo-list", JSON.stringify(semuaTugas));
}

function cekList() {
  if (list.children.length === 0) {
    listGaada.textContent = "there is no list yet!";
  } else {
    listGaada.textContent = "";
  }
}


function buatElemenTugas(teks, statusSelesai) {
  let item = document.createElement("div")
  item.classList.add("isi-list")
  if (statusSelesai) {
    item.classList.add("checked")
  }

  let centang = document.createElement("span")
  centang.classList.add("done")
  if (statusSelesai) {
    centang.classList.add("checked")
  }
  let iconCentang = document.createElement('i')
  iconCentang.className = 'fa-solid fa-check' 
  centang.appendChild(iconCentang)
  item.appendChild(centang)
  
  let teksTugas = document.createElement("p")
  teksTugas.textContent = teks
  item.appendChild(teksTugas)
  
  let buttonWrapper = document.createElement("div")
  buttonWrapper.classList.add("button-wrap")
  
  let editBtn = document.createElement("button")
  editBtn.classList.add("edit-button")
  editBtn.textContent = "Edit"
  editBtn.addEventListener("click", function(){
    let teksTugasBaru = prompt("enter new task:", teksTugas.textContent)
    if(teksTugasBaru != null && teksTugasBaru.trim() !== ""){
      teksTugas.textContent = teksTugasBaru
      simpanData()
    }
  })
  
  let hapusBtn = document.createElement("button")
  hapusBtn.classList.add("hapus-button")
  hapusBtn.textContent = "Remove"
  hapusBtn.addEventListener("click", function() {
    item.remove()
    cekList()
    simpanData() 
  })
  
  buttonWrapper.appendChild(editBtn)
  buttonWrapper.appendChild(hapusBtn)
  item.appendChild(buttonWrapper)
  list.appendChild(item)
  
  centang.addEventListener("click", function(){
    centang.classList.toggle("checked")
    item.classList.toggle("checked")
    simpanData()
  })
}

tombolTambah.addEventListener("click", function(){
  let tugas = input.value 
  if (tugas === "") {
    alert("Please enter a task first!");
    cekList()
  } 
  else {
    buatElemenTugas(tugas, false)
    cekList()
    simpanData() 
    input.value = ""
  }
})

function muatDataBawaan() {
  let dataLokal = localStorage.getItem("todo-list");
  if (dataLokal) {
    let daftarTugas = JSON.parse(dataLokal);
    daftarTugas.forEach(function(tugas) {
      buatElemenTugas(tugas.teks, tugas.selesai);
    });
  }
  cekList();
}
muatDataBawaan();
    
