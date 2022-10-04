const showingDate = date => {
    return new Date(date);
}

const parrotsTemplate = document.querySelector(".template");

let showingParrots = products.slice();

const parrotsList = document.getElementById("parrots-list");


const renderParrot = (parrot) => {
    const {
        id,
        title,
        img,
        price,
        birthDate,
        sizes: {
            width,
            height
        },
        isFavorite,
        features
    } = parrot;

    const templateBox = parrotsTemplate.content.cloneNode(true);


    const parrotsTitle = templateBox.querySelector(".parrots__title")
    parrotsTitle.textContent = title;

    const parrotsImg = templateBox.querySelector(".parrots__img");
    parrotsImg.src = img;

    const parrotsMark = templateBox.querySelector(".parrots__mark");
    parrotsMark.textContent = `$${price}`;

    const parrotsBirthDate = templateBox.querySelector(".parrots__date");
    parrotsBirthDate.textContent = birthDate;

    const parrotsSize = templateBox.querySelector(".parrots__subtitle");
    parrotsSize.textContent = `${width} x ${height}`;

    // const parrotIsFavorite = templateBox.querySelector(".parrots__star-btn");
    const parrotFeatures = templateBox.querySelector(".parrots__list-item");
    parrotFeatures.innerText = features;

    const parrotsEditBtn = templateBox.querySelector(".parrots__edit-btn");
    parrotsEditBtn.setAttribute("data-edit", id);

    const parrotDelBtn = templateBox.querySelector(".parrots__del-btn");
    parrotDelBtn.setAttribute("data-del", id);

    return templateBox;
} 

const countEl = document.querySelector(".count");

const renderParrots = () => {
    parrotsList.innerHTML = "";
    countEl.textContent = `Count ${showingParrots.length}`

    const parrotsFragment = document.createDocumentFragment();

    showingParrots.forEach(parrot => {
        const templateBoxing = renderParrot(parrot);
        parrotsFragment.append(templateBoxing);
    })

    parrotsList.append(parrotsFragment);
}

renderParrots();

const addForm = document.querySelector("#add-form");
const addParrotsModalEl = document.querySelector("#add-parrot-modal");
const addParrotsModal = new bootstrap.Modal(addParrotsModalEl);

addForm.addEventListener("submit", (evt) => {
    const elements = evt.target.elements;

    const addTitle = elements.title.value;
    const addImg = elements.img.value;
    const addPrice = elements.price.value;
    const addDate = elements.date.value;
    const addWidth = elements.width.value;
    const addHeight = elements.height.value;
    const addFeatures = elements.features.value;

    if (addTitle.trim() && addImg && addPrice > 0 && addDate.trim() && addWidth.trim() && addHeight.trim()) {
        const parrot = {
            id: Math.floor(Math.random() * 100),
            title: addTitle,
            img: String(addImg),
            price: addPrice,
            birthDate: addDate,
            sizes: {
                width: addWidth,
                height: addHeight
            },
            isFavorite: false,
            features: addFeatures
        }

        showingParrots.push(parrot);
        products.push(parrot);
        localStorage.setItem("products", JSON.stringify(products));
    }
    addForm.reset();
    addParrotsModal.hide();
    renderParrots();
})

const editModalEl = document.getElementById("edit-parrot-modal");
const editParrotsModal = new bootstrap.Modal(editModalEl);
const editForm = document.getElementById("edit-form");

const editTitleValue = document.getElementById("edit-parrot-title");
const editImgValue = document.getElementById("edit-parrot-img");
const editPriceValue = document.getElementById("edit-price");
const editDateValue = document.getElementById("edit-parrot-date");
const editWidthValue = document.getElementById("edit-parrot_width"); 
const editHeightInputVal = document.getElementById("edit-parrot_height");
const editHeightValue = document.getElementById("edit-features");
const editFeaturesValue = document.getElementById("edit-features");

parrotsList.addEventListener("click", (evt) => {
if (evt.target.matches(".btn-danger")) {

    const delIdx = +evt.target.dataset.del;

    const delBtnIdx = showingParrots.findIndex(product =>{
        return product.id === delIdx;
    })
    products.splice(delBtnIdx, 1);  
    showingParrots.splice(delBtnIdx, 1)
    localStorage.setItem("products", JSON.stringify(showingParrots));
    renderParrots();
    
} else if (evt.target.matches(".btn-secondary")) {

    const editedId = +evt.target.dataset.edit;

    const editedBtnId = showingParrots.find((parrot) => {
       return parrot.id = editedId;
    })

    editTitleValue.value = editedBtnId.title;
    editImgValue.value = editedBtnId.img;
    editPriceValue.value = editedBtnId.price;
    editDateValue.value = editedBtnId.date;
    editWidthValue.value = editedBtnId.width;
    editHeightValue.value = editedBtnId.height;
    editFeaturesValue.value = editedBtnId.features;

    editForm.setAttribute("data-editing", editedBtnId.id);

    renderParrots();
}
})

editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const idEdit = +evt.target.dataset.editing;

    const nameValue = editTitleValue.value;
    const imgValue = editImgValue.value;
    const priceValue = editPriceValue.value;
    const birthDateValue = editDateValue.value;
    const widthValue = editWidthValue.value;
    const heightValue = editHeightValue.value;
    const featuresValue = editFeaturesValue.value;

    if (nameValue && imgValue && priceValue && birthDateValue && widthValue && heightValue && featuresValue) {
        const parrot = {
            id: Math.floor(Math.random() * 100),
            title: nameValue,
            img: String(imgValue),
            price: priceValue,
            birthDate: birthDateValue,
            size: {
                width: widthValue,
                height: heightValue
            },
            features: featuresValue
        }

        const editShowingParrotIdx = showingParrots.findIndex(parrot => {
            return parrot.id = idEdit;
        })
        const editParrotIdx = products.findIndex(parrot => {
            return parrot.id = idEdit;
        })

        showingParrots.splice(editShowingParrotIdx, 1, parrot);
        products.splice(editParrotIdx, 1, parrot)

        localStorage.setItem("products", JSON.stringify(products));

        editForm.reset();
        editParrotsModal.hide();
    }

    renderParrots();
})



const filteredForm = document.querySelector(".filter");

filteredForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const elements = evt.target.elements;

  const sortValue = elements.sortby.value;

  const searchValue = elements.search.value;
  
  showingParrots = products.sort((a, b) => {
    switch(sortValue) {
      case "1":
        if (a.title > b.title) {
          return 1;
        } else if (b.title > a.title) {
          return -1;
        } else {
          return 0;
        }
      case "2":
        return b.price - a.price;
      case "3":
        return a.price - b.price;
      case "4":
        return a.birthDate - b.birthDate;
      case "5":
        return b.birthDate - a.birthDate;
      default:
        break;
    }
    renderParrots();
  }).filter((parrot) => {

      const regularExpression = new RegExp(searchValue, "gi");

      const searchName = parrot.title;
      
      return searchName.match(regularExpression);
  })
  renderParrots();
  // Filter ended
})