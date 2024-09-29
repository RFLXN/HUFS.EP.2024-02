/**
 * function for generate button that remove <li> element
 * @param {string} id target element id to remove 
 * @returns {HTMLButtonElement} remove button
 */
function createRemoveButton(id) {
    // create <button> element
    const button = document.createElement("button");

    // set button text
    button.textContent = "Remove";

    // add event listener to remove target element
    button.addEventListener("click", () => {
        const target = document.querySelector(`#${id}`);
        if (target) {
            target.remove();
        }
    });

    return button;
}

/**
 * generate random, unique id for <li> element
 * @returns {number} unique id for <li> element
 */
function generateUniqueId() {
    while (true) {
        // get all <li> elements
        const items = document.querySelectorAll("li");

        // generate random id
        const id = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER));
        
        // escaping for empty <li> elements
        if (items.length === 0) {
            return id;
        }

        // check if id is unique
        let has = false;
        items.forEach(i => {
            if (i.id === `item-${id}`) has = true;
        });

        // returns when id is unique
        if (!has) return id;
    }
}

/**
 * event listener for handling add button click
 * @returns {void}
 */
function onAddItemClick() {

    // get item name from input
    const itemName = document.querySelector('#itemInput')?.value;
    if (!itemName) return;

    // create <li> element
    const item = document.createElement("li");

    // set id for created <li> element
    const id = `item-${generateUniqueId()}`;

    // set name and id
    item.textContent = itemName;
    item.id = id;

    // create remove button and append to <li> element as child
    const removeButton = createRemoveButton(id);
    item.appendChild(removeButton);

    // append <li> element to <ul> element
    document.querySelector("#itemList")?.appendChild(item);

    // clear input value
    document.querySelector('#itemInput').value = "";
}

/**
 * event listener for handling clear button click
 * @returns {void}
 */
function onClearClick() {

    // get "Clear List" button
    const parent = document.querySelector("#itemList");

    // remove all children from <ul> element
    if (parent) parent.innerHTML = "";
}