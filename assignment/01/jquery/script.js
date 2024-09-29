/**
 * return random, unique id for <li> element
 * @returns {number} unique id for <li> element
 */
function generateUniqueId() {
    while (true) {
        const items = $("li");
        const id = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER));
        if (items.length === 0) {
            return id;
        }
        let has = false;
        items.each((_, i) => {
            if (i.id === `item-${id}`) has = true;
        });
        if (!has) return id;
    }
}

$(() => {
    // add event listener to "Add Item" buutton
    $("#addItemButton").click(() => {
        // get item name input
        const itemInput = $("#itemInput");

        // check if input is empty
        if (!itemInput || !itemInput.val()) return;

        // create id for <li> element
        const id = `item-${generateUniqueId()}`;

        // create <li> element
        const item = $("<li>").text(itemInput.val())
            .attr("id", id)
            .append(
                // and add remove button
                $("<button>").text("Remove")
                    .click(() => {
                        $(`#${id}`).remove();
                    })
            );
        
        // add <li> element to list
        $("#itemList").append(item);

        // clear input
        itemInput.val("");

    });

    // add event listener to "Clear List" button
    $("#clearListButton").click(() => {

        // clear list
        $("#itemList").empty();
    })
});