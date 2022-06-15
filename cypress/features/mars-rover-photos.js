// © 2022 Bruno Longo <bruno_pereira_longo@hotmail.com>
const MarsRover = {
    getPhotos: function getPhotos(filter, rover) {
        return cy.request({
            method: 'GET',
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?',
            qs: filter
        })
    }
}; export default MarsRover