/*Element.getBoundingClientRect() method returns the size of the element
and its position relative to the viewport.

//pageYOffset is a read - only window property that returns the number of pixels
the document has been scrolled vertically

//slice extracts a section of a string without modifying original string

//offsetTop - A number ,  representing the top position of the element, in pixels

*/

// ********* set date ***********
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();

// ********** close links ***********
const navtoggle = document.querySelector(".nav-toggle");
const linkContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// **********  fixed navbar **********
//containerHeight is as a default height is 0  we can't change height even if we add links
//but we can change height number in links because we didn't give number to links as a default like container height when we add the links height can change

navtoggle.addEventListener("click", function () {
  //linksContainer.classList.toggle('show-links'); bunun yerine dinamik olanini yaotik getBoundingClientRect() ile
  const containerHeight = linkContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linkContainer.style.height = `${linksHeight}px`;
  } else {
    linkContainer.style.height = 0;
  }
});

// ********      fixed navbar     ********
let navbar = document.querySelector("#nav");
let topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset; //scroll heigtini verir
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

//*********  smooth scroll *******/
//select links

const scrollinks = document.querySelectorAll(".scroll-link");

scrollinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    //preventDefault
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id); //document.getElementById ile element olarak gelir ekrana
    //calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linkContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");

    // let position = element.offsetTop   yukaridan o anki elemente kadar olanki numarayi verir offsetTop

    let position = element.offsetTop - navHeight;

    console.log(position);

    if (!fixedNav) {
      //calistirmak icin, degilse dedik ekranimizi tikladigimizda fixNav biraz daha alt kisimda old icin onu uste cektik
      position = position - navHeight;
    }

    if (navHeight > 82) {
      position = position + containerHeight;
    }

    console.log(position);
    window.scrollTo({
      left: 0, //left :0 cunku biz dikine olmasini istiyoruz
      top: position,
    });

    linkContainer.style.height = 0; //togglumuzda tikladigimizda  linklerimiz dikey olarak gelir bizde gorunmemesi icin height=0 degerini verdik
  });
});
