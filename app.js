let news = document.getElementById('news')
let search = document.getElementById('search')
let miniSearch = document.getElementById('mini-search')
let resultNum = document.getElementById('resultNum')
let btn = document.getElementById('btn')
let nextpage = ""
let searchKey

if(search.value === undefined || null){
   searchKey = miniSearch
}
else{
  searchKey = search.value
}

const newsBringer = async () => {
  var url = 'https://newsdata.io/api/1/news?' +
    `apikey=pub_382913f3350be2fba3e927c99fdad97348631&` +
    `q=${searchKey}&` +
    `language=en`

  const objecturl = await fetch(url)
  const object = await objecturl.json()
  nextpage = `page=${object.nextPage}`
  fetchNews(object)
}


const increasePage = async () => {
  var url = 'https://newsdata.io/api/1/news?' +
    `apikey=pub_382913f3350be2fba3e927c99fdad97348631&` +
    `q=${searchKey}&` +
    `language=en&` +
    `${nextpage}`

  const objecturl = await fetch(url)
  const object = await objecturl.json()
  nextpage = `page=${object.nextPage}`
  fetchNews(object)
}

const fetchNews = async (object) => {
  news.innerHTML = ""
  if (object.totalResults != undefined) {
    resultNum.innerHTML = `(${object.totalResults}) Results Found for ${searchKey}`
  }

  for (let item of object.results) {
    let description = item.description
    let myArray = description.split(" ")
    let length = myArray.length
    let num = 2
    if (item.image_url === null || undefined) {
      num = "170px"
    }
    if (length > 20) {
      myArray.splice(20, (length - 1));
    }
    myArray.push("...")
    myArray = myArray.join(" ")
    btn.innerHTML =
      `<button class="bg-red-500 px-8 py-3 rounded-xl -mb-96 place-self-center mt-10" onclick="increasePage()">
          Next Page >
    </button>`
    news.innerHTML = news.innerHTML + `
    <div class="place-items-center min-[2100px]:w-[400px] min-[1800px]:w-[350px] min-[1950px]:w-[375px] w-72 bg-white mx-auto place-self-center p-4 min-h-[620px] md:max-h-[620px] relative">
    <img src="${item.image_url}" class="min-[1500px]:max-h-[130px] mx-auto min-[1800px]:max-h-[160px] min-[1950px]:max-h-[200px] mb-10" alt="Sorry Image Cannot be loaded">    
    <h2 class="text-sky-400 text-center text-xl font-semibold mt-[${num}] overflow-hidden">${item.title}</h2>
        <p class="mt-5 mx-8 text-center">${myArray}</p>
          <a href="${item.link}" class="place-items-center -mr-20" target="_blank"><button
            class="absolute bg-red-500 px-8 bottom-10 min-[2100px]:ml-[80px] min-[1800px]:ml-[75px] min-[1600px]:ml-[70px] ml-[65px] py-3 rounded-xl mt-10 min-[1800px]:px-12 min-[1800px]:py-5 min-[1800px]:text-lg">Read
            More</button></a>
      </div>
      `
  }
  console.log(object);
}
