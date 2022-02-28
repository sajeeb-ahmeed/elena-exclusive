const searchPhone = async () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = ''
    // console.log(searchValue);
    const api_url = (`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const response = await fetch(api_url);
    const data = await response.json();
    phonesData(data.data);

}

const phonesData = datas => {
    // console.log(datas);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    datas.forEach(element => {
        console.log(element);
        const createDiv = document.createElement('div');
        createDiv.className = 'col';
        createDiv.innerHTML = `
            <div  class="card h-100 text-center">
                 <img src="${element.image}" class="card-img-top img-fulid d-block mx-auto p-2 w-50" alt=" ${element.phone_name}'s image">
                <div class="card-body">
                    <h5 class="card-title"> Brand: ${element.brand}</h5>
                    <h6> Model: ${element.phone_name}  </h6>     
                    <button class=" btn-outline-dark"> See Details </button>                                            
                </div>
            </div>
                                `
        phoneContainer.appendChild(createDiv)
    });
}