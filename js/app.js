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
                 <h2 class="card-title"></h2>
                  <p>Click the button to listen on Spotiwhy app.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Listen</button>
                    </div>
            </div>
        </div>
    `;
    allNewsContainer.appendChild(div);
  });
};

lodeAllNewsCategory();
