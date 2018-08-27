//get method

const loadData = function () {
    $.ajax({
        url: 'http://localhost:3000/posts',
        contentType: 'application/json',
        success: function (response) {
            var tbodyEl = $('tbody');

            tbodyEl.html('');

            response.forEach(function (el) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + el.id + '</td>\
                        <td><input type="text" class="name" value="' + el.name + '"></td>\
                        <td><input type="text" class="post" value="' + el.post + '"></td>\
                        <td>\
                        <button class="update-button  btn btn-outline-secondary">Edit</button>\
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

    let userInput = $('#username');
    let postInput = $('#post');

    $.ajax({
        url: 'http://localhost:3000/posts',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: userInput.val(),
            post: postInput.val()
        }),
        success: function (response) {
            console.log(response);

            userInput.val('');
            postInput.val('');
            loadData();
            // $('#sub-button').click();
        }
    });
});


// put method
$('table').on('click', '.update-button', function () {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();
    var newTitle = rowEl.find('.name').val();
    var newBody = rowEl.find('.post').val();
    console.log(newTitle);
    console.log(newBody);

    $.ajax({
        url: 'http://localhost:3000/posts/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ name: newTitle, post: newBody }),
        success: function (response) {
            loadData();
            // $('#sub-button').click();
        }
    });
});

//delete methode 
$('table').on('click', '.delete-button', function () {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();
    console.log(rowEl.html);
    $.ajax({
        url: 'http://localhost:3000/posts/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (response) {
            console.log(response[0]);
            // $('#sub-button').click();
            loadData();
        }
    });
});