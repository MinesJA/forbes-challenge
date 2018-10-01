document.addEventListener("DOMContentLoaded", function(event){

  var gridDiv = document.getElementById("main-gallery");
  var btn = document.getElementById("myBtn");
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  var pageNumDiv = document.getElementById("page-numbers");
  var modalContainer = document.getElementById("modalContainer");

  let currentPage = 1;

  gridDiv.innerHTML = "";

  gridDiv.addEventListener('click', onPhotoClick);
  pageNumDiv.addEventListener('click', onPageClick);

  Adapter.fetchPhotos()
    .then(resp => {
      let imageArray = resp.photos.photo;
      let numPages = imageArray.length / 10;

      // Build footer with page numbers
      for(let i = 1; i <= numPages; i++){
        if(i == 1){
          pageNumDiv.innerHTML += `<a href="#${i}" class="active">${i}</a>`;
        }else{
          pageNumDiv.innerHTML += `<a href="#${i}">${i}</a>`;
        }
      }

      // Build image instances using Image class
      for(let i = 0; i < imageArray.length; i++){
        let image = new Image(imageArray[i]);
      }

      // Render images on page
      setImageGrid()
    })

  function onPageClick(event){
    let activeNode = pageNumDiv.children[currentPage-1];
    activeNode.classList.remove("active");

    currentPage = parseInt(event.target.innerText);
    activeNode = pageNumDiv.children[currentPage-1];
    activeNode.setAttribute("class", "active");

    gridDiv.innerHTML = "";

    setImageGrid()
  }

  function setImageGrid(){
    // Renders images on page using return image collection function
    Image.returnImageCol(currentPage).forEach((image)=>{
      gridDiv.innerHTML += image.render();
    })
  }

  function onPhotoClick(event){
    let imageId = parseInt(event.target.id);
    image = Image.find(imageId);
    modalContainer.firstElementChild.innerHTML += image.render("modal");
    modalContainer.style.display = "block";
  }

  window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
      modalContainer.firstElementChild.innerHTML = "";
    }
  }

});
