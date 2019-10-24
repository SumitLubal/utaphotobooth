$('#collapsableFilters').on('show.bs.collapse', function () {
    console.log('copp');
    // hide the other one
    $('#collapsableStickers').collapse('hide');
})
$('#collapsableStickers').on('show.bs.collapse', function () {
    console.log('copp');
    // hide the other one
    $('#collapsableFilters').collapse('hide');
})