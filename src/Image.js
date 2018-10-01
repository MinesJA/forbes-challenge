const Image = (()=>{
  const allImages = []

  return class{
    constructor(imageJSON){
      this.farm = imageJSON.farm
      this.server = imageJSON.server
      this.secret = imageJSON.secret
      this.id = imageJSON.id
      this.imageUrl = `https://farm${this.farm}.staticflickr.com/${this.server}/${this.id}_${this.secret}.jpg`
      allImages.push(this)
    }

    render(type = "gallery"){
      // renders either an image tag for the gallery or image take for the modal
      if(type == "modal"){
        return(`<img src="${this.imageUrl}" id="${this.id}" alt="${this.server}-${this.farm}" class="modal-img" />`)
      }else{
        return(`<img src="${this.imageUrl}" id="${this.id}" alt="${this.server}-${this.farm}" class="gallery-img" />`)
      }
    }

    static returnImageCol(page){
      // returns a collection of 10 images for page number given
      var startIndex = parseInt(page-1+"0")
      var endIndex = startIndex + 10

      return allImages.slice(startIndex, endIndex)
    }

    static find(id){
      // find image by id
      return allImages.find( image => image.id == id)
    }

  }
})()
