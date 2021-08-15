$(function () {
    const findRoom = () => {
        $('#room').empty();
        const username = $('#username').val();

        // find room
        $.ajax({
            url: "/api/index",
            data: {
                userName: username
            },
            dataType: "json", // 받을 때 format
            type: "get", // 요청 method
            success: function (response) {
                const titles = response.data.map(room => room.title);
                $('#room').append(titles.map(title => `<option value="${title}">${title}</option>`))
            }
        });
    }

    findRoom();
    $('#username').change(findRoom);
})