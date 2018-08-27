//get method

const loadData = function () {
    $.ajax({
        url: 'http://localhost:3000/categories',
        contentType: 'application/json',
        success: function (response) {
            var tbodyEl = $('tbody');

            tbodyEl.html('');

            response.forEach(function (el) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + el.id + '</td>\
                        <td><input type="text" class="categories" value="' + el.name + '"></td>\
                        \
                        <td>\
                        <button class="update-button btn btn-outline-secondary" >Edit</button>\
                        <button class="delete-button  btn btn-outline-secondary">Delet</i></button>\
                        </td>\
                    </tr>\
                ');
            });
        }
    });
};

loadData();

//post methood

$('.form-block').on('submit', function (event) {
    event.preventDefault();

    let categoriesInput = $('#categories');


    $.ajax({
        url: 'http://localhost:3000/categories',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: categoriesInput.val()

        }),
        success: function (response) {
            console.log(response);

            categoriesInput.val('');

            loadData();

        }
    });
});


// put method
$('table').on('click', '.update-button', function () {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();
    var newTitle = rowEl.find('.categories').val();

    console.log(newTitle);


    $.ajax({
        url: 'http://localhost:3000/categories/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ name: newTitle }),
        success: function (response) {
            loadData();

        }
    });
});

//delete methode 
$('table').on('click', '.delete-button', function () {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();
    console.log(rowEl.html);
    $.ajax({
        url: 'http://localhost:3000/categories/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {
            console.log(response[0]);

            loadData();
        }
    });

});