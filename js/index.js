var contactImageInput = document.getElementById("photo-input");
var contactNameInput = document.getElementById("contactName");
var contactPhoneInput = document.getElementById("contactPhone");
var contactEmailInput = document.getElementById("contactEmail");
var contactAddressInput = document.getElementById("contactAddress");

var contactGroupInput = document.getElementById("contactGroup");
var defaultOptionElement = document.getElementById("defaultOption");
var contactNoteInput = document.getElementById("contactNote");
var contactFavoriteInput = document.getElementById("favoriteCheckbox");
var contactEmergencyInput = document.getElementById("emergencyCheckbox");
var formSwitch = document.getElementById("holding-all-form-things");
var innerForm = document.getElementById("innerForm");
var containerElement = document.getElementById("containerElement");

var favContactContainer = document.getElementById("samllFavContact");
var emerContactContainer = document.getElementById("samllEmerContact");

let addUpdatebtn = document.getElementById("addContactbtn");

var totalContactNumber = document.getElementById("totalNumberOfContact");
var totalFavorite = document.getElementById("totalNumberOfFavContact");
var totalEmergancy = document.getElementById("totalNumberOfEmerContact");

var formTitle = document.getElementById("titleOfForm");

var realtionColors = {
  Family: ["var(--color-blue-100)", "var(--color-blue-700)"],
  Friends: ["var(--color-green-100)", "var(--color-green-700)"],
  Work: ["var(--color-purple-100)", "var(--color-purple-700)"],
  School: ["var(--color-amber-100)", "var(--color-amber-700)"],
  other: ["var(--color-gray-100)", "var(--color-gray-700)"],
};
var contactInputRegex = {
  contactName: /^[a-zA-Z\s]{2,50}$/,
  contactPhone: /^(\+)?(2)?01[0|1|2|5][0-9]{8}$/,
};
var contacts = [];
if (localStorage.getItem("myContact")) {
  contacts = JSON.parse(localStorage.getItem("myContact"));
  display(contacts);
}

function closeForm() {
  resetAllInputs();
  formSwitch.classList.remove("d-blcok");
  formSwitch.classList.add("d-none");
  innerForm.scrollTop = 0;
}
function openForm() {
  formTitle.innerHTML = `Add New Contact`;
  formSwitch.classList.remove("d-none");
  formSwitch.classList.add("d-blcok");
  innerForm.scrollTop = 0;
}
function resetAllInputs() {
  contactNameInput.value = null;
  contactPhoneInput.value = null;
  contactEmailInput.value = null;
  contactAddressInput.value = null;
  contactGroupInput.value = null;
  defaultOptionElement.selected = true;
  contactNoteInput.value = null;
  contactFavoriteInput.checked = false;
  contactEmergencyInput.checked = false;
  contactImageInput.value = null;

  contactNameInput.classList.remove("is-valid", "is-invalid");
  contactPhoneInput.classList.remove("is-valid", "is-invalid");
  contactNameInput.nextElementSibling.classList.replace("d-block", "d-none");
  contactPhoneInput.nextElementSibling.classList.replace("d-block", "d-none");
}

function setLocal() {
  localStorage.setItem("myContact", JSON.stringify(contacts));
}

function addContact(k) {
  if (
    isValidContact(contactInputRegex.contactName, contactNameInput) &
    isValidContact(contactInputRegex.contactPhone, contactPhoneInput)
  ) {
    var cont = {
      contactName: contactNameInput.value,
      contactPhone: contactPhoneInput.value,
      contactEmail: contactEmailInput.value,
      contactAddress: contactAddressInput.value,
      contactGroup: contactGroupInput.value,
      contactNote: contactNoteInput.value,
      contactFavorite: contactFavoriteInput.checked,
      contactEmergency: contactEmergencyInput.checked,
      contactImage: contactImageInput.files[0]
        ? contactImageInput.files[0]?.name
        : null,
    };
    console.log(cont.contactGroup);
    if (k > -1) {
      contacts[k] = cont;
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Contact has been updated successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      contacts.push(cont);
      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Contact has been added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setLocal();
    display(contacts);
    closeForm();
  } else {
    if (
      isValidContact(contactInputRegex.contactName, contactNameInput) == false
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Name",
        text: "Please enter a name for the contact!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Missing Phone",
        text: "Please enter a phone number!",
      });
    }
  }
  console.log("cadfa");
}

function display(targetList) {
  var productStr = ``;
  let favContacts = [];
  let emergContacts = [];

  for (let i = 0; i < targetList.length; i++) {
    if (targetList[i].contactFavorite) {
      favContacts.push(targetList[i]);
    }
    if (targetList[i].contactEmergency) {
      emergContacts.push(targetList[i]);
    }
    productStr += `<div class="col-12 col-md-6">
                  <div class="contact-holder">
                    <div class="padd-for-top">
                      <!--image and name and phone-->
                      <div class="d-flex gap-3">
                        <div class="position-relative">
                          <!--star icon-->
                          ${
                            targetList[i].contactFavorite
                              ? `<div>
                            <div class="small-main-fav-emeer-icon-holder">
                              <i class="fa-solid fa-star"></i>
                            </div>
                          </div>`
                              : ``
                          }
                          
                          <!--heart icon-->
                          ${
                            targetList[i].contactEmergency
                              ? `<div>
                              <div
                                class="small-main-fav-emeer-icon-holder"
                                style="
                                  bottom: calc(var(--spacing) * -0.5);
                                  top: auto;
                                  background-color: var(--color-rose-500);
                                "
                                
                              >
                                <i class="fa-solid fa-heart-pulse"></i>
                              </div>
                            </div>`
                              : ``
                          }
                          
                          <!--image or first letter-->
                          <div class="person-image-holder overflow-hidden">
                          ${
                            targetList[i].contactImage
                              ? `<img
                                src="./images/${targetList[i].contactImage}"
                                class="w-100"
                                alt=""
                              />`
                              : targetList[i].contactName[0].toUpperCase()
                          }
                            
                          </div>
                        </div>
                        <!--name and number-->
                        <div>
                          <h3 class="contact-name-style">${targetList[i].contactName}</h3>
                          <div class="d-flex gap-2 align-items-center">
                            <div class="small-phone-holder-icon">
                              <i
                                class="fa-solid fa-phone"
                                style="
                                  font-size: 9px;
                                  color: var(--color-blue-600);
                                "
                              ></i>
                            </div>
                            <span class="number-style" >${targetList[i].contactPhone}</span>
                          </div>
                        </div>
                      </div>
                      <!--email-->
                      ${
                        targetList[i].contactEmail
                          ? `<div
                        class="d-flex gap-2"
                        style="margin-top: calc(var(--spacing) * 3)"
                      >
                        <div class="main-message-icon-holder">
                          <i class="fa-solid fa-envelope"></i>
                        </div>
                        <span
                          style="
                            color: var(--color-gray-600);
                            font-size: var(--text-sm);
                          "
                          >${targetList[i].contactEmail}</span
                        >
                      </div>`
                          : ``
                      }
                      
                      <!--address-->
                      ${
                        targetList[i].contactAddress
                          ? `<div
                        class="d-flex gap-2"
                        style="margin-top: calc(var(--spacing) * 3)"
                      >
                        <div
                          class="main-message-icon-holder"
                          style="background-color: var(--color-emerald-100)"
                        >
                          <i
                            class="fa-solid fa-location-dot"
                            style="color: var(--color-emerald-600)"
                          ></i>
                        </div>
                        <span
                          style="
                            color: var(--color-gray-600);
                            font-size: var(--text-sm);
                          "
                        >
                          ${targetList[i].contactAddress}
                        </span>
                      </div>`
                          : ``
                      }
                      
                      <!--tpye of relation-->
                      
                      <div
                        class="d-flex gap-3"
                        style="margin-top: calc(var(--spacing) * 3)"
                      >
                        ${
                          targetList[i].contactGroup != "Select a group"
                            ? `<span
                          class="relation-holder"
                          style="
                            background-color: ${realtionColors[targetList[i].contactGroup][0]};
                            color: ${realtionColors[targetList[i].contactGroup][1]};
                          "
                        >
                          ${targetList[i].contactGroup}
                        </span>`
                            : ``
                        }
                        ${
                          targetList[i].contactEmergency
                            ? `<span class="relation-holder">
                          <i class="fa-solid fa-heart-pulse"></i>
                          Emergency
                        </span>`
                            : ``
                        }
                        
                      </div>
                    </div>
                    <!--botton bar-->
                    <div
                      class="bottom-call-bar d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex gap-2">
                        <a href="tel:${targetList[i].contactPhone}" style="text-decoration: none">
                          <div
                            class="main-message-icon-holder"
                            style="
                              background-color: var(--color-emerald-50);
                              width: calc(var(--spacing) * 9);
                              height: calc(var(--spacing) * 9);
                            "
                          >
                            <i
                              class="fa-solid fa-phone"
                              style="color: var(--color-emerald-600); font-size: var(--text-sm)"
                            ></i>
                          </div>
                        </a>
                        <a href="mailto:${targetList[i].contactEmail}" style="text-decoration: none">
                          <div
                            class="main-message-icon-holder"
                            style="
                              width: calc(var(--spacing) * 9);
                              height: calc(var(--spacing) * 9);
                            "
                          >
                            <i class="fa-solid fa-envelope" style="font-size: var(--text-sm)"></i>
                          </div>
                        </a>
                      </div>
                      <div class="d-flex gap-2">
                        ${
                          targetList[i].contactFavorite
                            ? `<div
                          class="main-message-icon-holder"
                          style="
                            background-color: var(--color-amber-50);
                            width: calc(var(--spacing) * 9);
                            height: calc(var(--spacing) * 9);
                          "
                          onclick="setFav(${i})"
                        >
                          <i
                            class="fa-solid fa-star"
                            style="
                              color: var(--color-amber-400);
                              font-size: var(--text-sm);
                            "
                          ></i>
                        </div>`
                            : `<div
                          class="main-message-icon-holder"
                          style="
                            background-color: var(--color-gray-50);
                            width: calc(var(--spacing) * 9);
                            height: calc(var(--spacing) * 9);
                          "
                          onclick="setFav(${i})"
                        >
                          <i
                            class="fa-regular fa-star"
                            style="
                              color: var(--color-gray-400);
                              font-size: var(--text-sm);
                            "
                          ></i>
                        </div>`
                        }
                        

                        ${
                          targetList[i].contactEmergency
                            ? `<div
                          class="main-message-icon-holder"
                          style="
                            background-color: var(--color-rose-50);
                            width: calc(var(--spacing) * 9);
                            height: calc(var(--spacing) * 9);
                          "
                          onclick="setEmer(${i})"
                        >
                          <i
                            class="fa-solid fa-heart-pulse"
                            style="
                              color: var(--color-rose-500);
                              font-size: var(--text-sm);
                            "
                          ></i>
                        </div>`
                            : `<div
                          class="main-message-icon-holder"
                          style="
                            background-color: var(--color-gray-50);
                            width: calc(var(--spacing) * 9);
                            height: calc(var(--spacing) * 9);
                          "
                          onclick="setEmer(${i})"
                        >
                          <i
                            class="fa-regular fa-heart"
                            style="
                              color: var(--color-gray-400);
                              font-size: var(--text-sm);
                            "
                          ></i>
                        </div>`
                        }
                        

                        <div
                          class="main-message-icon-holder pw-hov"
                          style="
                            width: calc(var(--spacing) * 9);
                            height: calc(var(--spacing) * 9);
                          "
                          onclick="moveContactInfoToInputs(${targetList.length == contacts.length ? i : targetList[i].oldIndex})"
                        >
                          <i
                            class="fa-solid fa-pen"
                            style="font-size: var(--text-sm)"
                          ></i>
                        </div>

                        <div
                          class="main-message-icon-holder pw-hov vv2"
                          style="
                            width: calc(var(--spacing) * 9);
                            height: calc(var(--spacing) * 9);
                          "
                          onclick="deleteContact(${targetList.length == contacts.length ? i : targetList[i].oldIndex})"
                        >
                          <i
                            class="fa-solid fa-trash"
                            style="font-size: var(--text-sm)"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }

  containerElement.innerHTML = productStr;
  totalContactNumber.innerHTML = `${contacts.length}`;
  totalFavorite.innerHTML = `${favContacts.length}`;
  totalEmergancy.innerHTML = `${emergContacts.length}`;
  showSideFav(favContacts);
  showSideEmer(emergContacts);
}

function setFav(w) {
  contacts[w].contactFavorite = !contacts[w].contactFavorite;
  display(contacts);
  setLocal();
}
function setEmer(w) {
  contacts[w].contactEmergency = !contacts[w].contactEmergency;
  display(contacts);
  setLocal();
}
var updatedIndex;

function moveContactInfoToInputs(index) {
  contactNameInput.value = contacts[index].contactName;
  contactPhoneInput.value = contacts[index].contactPhone;
  contactEmailInput.value = contacts[index].contactEmail;
  contactAddressInput.value = contacts[index].contactAddress;
  contactGroupInput.value = contacts[index].contactGroup;
  contactNoteInput.value = contacts[index].contactNote;
  contactFavoriteInput.checked = contacts[index].contactFavorite;
  contactEmergencyInput.checked = contacts[index].contactEmergency;

  openForm();
  formTitle.innerHTML = `Edit Contact`;

  updatedIndex = index;
  addUpdatebtn.setAttribute("onclick", "updateContact()");
}
function updateContact() {
  addContact(updatedIndex);
  display(contacts);
  setLocal();
  resetAllInputs();
  addUpdatebtn.setAttribute("onclick", "addContact(-1)");
}
function showSideFav(targetList) {
  var productStr = ``;
  if (targetList.length === 0) {
    productStr += `<div
                    class="text-center"
                    style="
                      padding-block: calc(var(--spacing) * 8);
                      color: var(--color-gray-400);
                      font-size: var(--text-sm);
                    "
                  >
                    <p>No emergency contacts</p>
                  </div>`;
  } else {
    for (let i = 0; i < targetList.length; i++) {
      productStr += `<li class="contact-small-view-holder">
                    <div class="d-flex gap-2 align-items-center">
                      <div
                        class="wearss overflow-hidden"
                        style="
                          background-image: linear-gradient(
                            to bottom right,
                            var(--color-rose-500),
                            var(--color-pink-600)
                          );
                        "
                      >
                      ${
                        targetList[i].contactImage
                          ? `<img
                                src="./images/${targetList[i].contactImage}"
                                class="w-100"
                                alt=""
                              />`
                          : targetList[i].contactName[0].toUpperCase()
                      }
                      
                      </div>
                      <div>
                        <h4
                          style="
                            color: var(--color-gray-900);
                            font-weight: 500;
                            font-size: var(--text-sm);
                            margin: 0;
                          "
                        >
                          ${targetList[i].contactName}
                        </h4>
                        <p
                          style="
                            color: var(--color-gray-500);
                            font-size: var(--text-xs);
                            margin: 0;
                          "
                        >
                          ${targetList[i].contactPhone}
                        </p>
                      </div>
                    </div>
                    <a href="#${targetList[i].contactPhone}" class="sty-anc-call">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </li>`;
    }
  }

  favContactContainer.innerHTML = productStr;
}
function showSideEmer(targetList) {
  var productStr = ``;
  if (targetList.length === 0) {
    productStr += `<div
                    class="text-center"
                    style="
                      padding-block: calc(var(--spacing) * 8);
                      color: var(--color-gray-400);
                      font-size: var(--text-sm);
                    "
                  >
                    <p>No emergency contacts</p>
                  </div>`;
  } else {
    for (let i = 0; i < targetList.length; i++) {
      productStr += `<li class="contact-small-view-holder fav-effect">
                    <div class="d-flex gap-2 align-items-center">
                      <div
                        class="wearss overflow-hidden"
                        style="
                          background-image: linear-gradient(
                            to bottom right,
                            var(--color-rose-500),
                            var(--color-pink-600)
                          );
                        "
                      >
                      ${
                        targetList[i].contactImage
                          ? `<img
                                src="./images/${targetList[i].contactImage}"
                                class="w-100"
                                alt=""
                              />`
                          : targetList[i].contactName[0].toUpperCase()
                      }
                        
                      </div>
                      <div>
                        <h4
                          style="
                            color: var(--color-gray-900);
                            font-weight: 500;
                            font-size: var(--text-sm);
                            margin: 0;
                          "
                        >
                          ${targetList[i].contactName}
                        </h4>
                        <p
                          style="
                            color: var(--color-gray-500);
                            font-size: var(--text-xs);
                            margin: 0;
                          "
                        >
                          ${targetList[i].contactPhone}
                        </p>
                      </div>
                    </div>
                    <a
                      href="#${targetList[i].contactPhone}"
                      class="sty-anc-call fav-calll-effect"
                    >
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </li>`;
    }
  }

  emerContactContainer.innerHTML = productStr;
}

function searchByContacttNameEmailPhone(searchValue) {
  var filteredProduct = [];
  for (let i = 0; i < contacts.length; i++) {
    if (
      contacts[i].contactName
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      contacts[i].contactEmail
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      contacts[i].contactPhone.includes(searchValue.toLowerCase())
    ) {
      contacts[i].oldIndex = i;
      filteredProduct.push(contacts[i]);
    }
  }
  display(filteredProduct);
}
function deleteContact(deletedIndex) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete mohamed gomaa? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280;",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      contacts.splice(deletedIndex, 1);
      setLocal();
      display(contacts);
    }
  });
}

function isValidContact(regex, inpValue) {
  if (regex.test(inpValue.value)) {
    inpValue.classList.add("is-valid");
    inpValue.classList.remove("is-invalid");
    inpValue.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    inpValue.classList.add("is-invalid");
    inpValue.classList.remove("is-valid");
    inpValue.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
