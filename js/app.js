const lodeAllNewsCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNewsCategory(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayAllNewsCategory = (newses) => {
  //   console.log(newses);
  const allNewsCategoryContainer = document.getElementById("all-news-category");
  allNewsCategoryContainer.textContent = "";
  newses.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class="font-bold text-fuchsia-800 text-center text-lg  ">
           <button onclick=" loadAllNews('${news.category_id}')">${news.category_name}</button>
        </div>
    `;

    allNewsCategoryContainer.appendChild(newsDiv);
  });
};

const loadAllNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNews(data.data))
    .catch((error) => console.log(error));
};
//spinner
const toggleSpinner = (displayStyle) => {
  document.getElementById("toggle_spinner").style.display = displayStyle;
};

const displayAllNews = (allNews) => {
  document.getElementById("error_messsage").innerText = "";
  if (allNews.length === 0) {
    document.getElementById("error_messsage").innerText = "Not Found";
    toggleSpinner("none");
  }
  //   console.log(AllNews);
  const lengthContainer = document.getElementById("length-message");
  const allNewsContainer = document.getElementById("news-details");
  const p = document.createElement("p");
  lengthContainer.textContent = "";
  p.innerHTML = `
         ${allNews.length} Items Found for the category
    `;
  lengthContainer.appendChild(p);
  allNewsContainer.textContent = "";

  allNews.forEach((allnewses) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card lg:card-side bg-base-100  shadow-lg shadow-cyan-500/50 mx-auto my-6">
          <figure><img src="${allnewses.thumbnail_url}" alt="Album"/></figure>
            <div class="card-body">
                 <h2 class="card-title  font-semibold text-white">${
                   allnewses.title
                 }</h2>
                 <p class="text-gray-400">
                  ${allnewses.details.slice(0, 300)}...</p>
                 <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <figure><img class='w-12  px-2' src=${
                              allnewses.author.img
                            } alt="Album"></figure>
                            <p>${
                              allnewses.author.name
                                ? allnewses.author.name
                                : "Not A Found Result"
                            }</p>
                        </div>
                        <div class="flex  items-center">
                            <i class="fa-solid fa-eye">${
                              allnewses.total_view
                                ? allnewses.total_view
                                : "no views this news"
                            }</i>
                        </div>
                      <div class="card-actions">
                          <label for="my-modal-6"  onclick="loadNewsDetails('${
                            allnewses._id
                          }')" class="btn btn-primary modal-button">Show Details</label>
                      </div>
                  </div>

                   
            </div>
        </div>
    `;
    allNewsContainer.appendChild(div);
  });
  toggleSpinner("none");
};

const loadNewsDetails = (_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data));
};

const displayNewsDetails = (newsDetails) => {
  // console.log(newsDetails);
  const modalContainer = document.getElementById("modal");
  modalContainer.textContent = "";
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
    <h1 class="font-bold text-medium my-2" >${newsDetails[0].title}</h1>
    <div class="card card-side bg-base-100">
       <figure><img class="rounded-lg" src="${
         newsDetails[0].thumbnail_url
       }" alt="Movie"/></figure>
          <div class="card-body">
               <h4 class="card-title">Name: ${
                 newsDetails[0].author.name
                   ? newsDetails[0].author.name
                   : "Missing Author Name"
               }</h4>
                <p><span class='text-lime-600 font-medium'>Publish Date : </span>${
                  newsDetails[0].author.published_date
                    ? newsDetails[0].author.published_date
                    : "Not A Found"
                }</p>
                <p><span class='text-lime-600 font-medium'>  Details : </span>${
                  newsDetails[0].details.slice(0, 100)
                    ? newsDetails[0].details.slice(0, 100)
                    : "Not Found"
                }</p>
                <p><span class='text-lime-600 font-medium'>Rating Badge : </span> ${
                  newsDetails[0].rating.badge
                    ? newsDetails[0].rating.badge
                    : "Not A Found"
                }</p>
   
       </div>
      </div>
   `;
  modalContainer.appendChild(modalDiv);
};

lodeAllNewsCategory();
