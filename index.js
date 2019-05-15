const CatGridDemo = function CatGridDemo()  {

  let imageHolderElem = document.createElement('div');
  imageHolderElem.setAttribute('class', 'cathold');
  document.body.insertBefore(imageHolderElem, document.body.nextSibling);

  this.resetButton = document.createElement("button");
  this.resetButton.innerHTML = "Click Here";
   
  this.resetButton.addEventListener('click', function resetButtonClickEventListener(e) {
    if (e.target && e.target.nodeName === 'BUTTON') {
      console.log("Reset Clicked");

      
      return fetch('https://api.thecatapi.com/api/images/get?format=xml&results_per_page=20')
      .then(function responseHandler(response) {
        console.log("responseHandler");
        return response.text();
      })
      .then(function textResponseHandler(testData) {
        console.log(testData);
        let parser = new DOMParser();
        let dom = parser.parseFromString(testData, "text/xml");
         
        console.log(dom.documentElement.getElementsByTagName('image'));
        let htmlCollection = dom.documentElement.getElementsByTagName('image')
        let imageArray = Array.prototype.slice.call(htmlCollection);
        
        console.log(imageArray);
        imageHolderElem.innerHTML = imageArray.reduce((prev, cur) => {
          console.log(cur);
          console.log(cur.getElementsByTagName('url')[0].innerHTML);
          return prev + '<img src="' + 
            cur.getElementsByTagName('url')[0].innerHTML + 
            '" />'; 
          
        }, '');
      });
    }
  });
  document.body.insertBefore(this.resetButton, document.body.nextSibling);

} 



if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    CatGridDemo,
  };
} else {
  window.CatGridDemo = CatGridDemo;

  window.onload = function onload() {
    window.cgd = new CatGridDemo();
  };
}