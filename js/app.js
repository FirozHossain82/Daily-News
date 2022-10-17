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

const displayAllNews = (allNews) => {
  //   console.log(AllNews);
  const allNewsContainer = document.getElementById("news-details");
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
                          <button onclick="loadNewsDetails('${
                            allnewses._id
                          }')" class="btn btn-primary">Details</button>
                      </div>
                  </div>

                   
            </div>
        </div>
    `;
    allNewsContainer.appendChild(div);
  });
};

lodeAllNewsCategory();
