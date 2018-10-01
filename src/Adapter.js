const Flickr = {
  api_key: "850db8001af69d415c6df9d93955e72a",
  api_url: "https://api.flickr.com/services/rest/",
  user_id: "84716639@N00"
}

class Adapter{

  static fetchPhotos(){
    return fetch(`${Flickr.api_url}?method=flickr.people.getPublicPhotos&api_key=${Flickr.api_key}&user_id=${Flickr.user_id}&format=json&nojsoncallback=1`)
      .then(res => res.json())
  }

}
