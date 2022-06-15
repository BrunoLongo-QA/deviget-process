// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// © 2022 Bruno Longo <bruno_pereira_longo@hotmail.com>
import { MarsRover } from '../features/index'

Cypress.Commands.add('retrivePhotos', function (filter, rover) {
    MarsRover.getPhotos(filter, rover).should(function (response) {
        expect(response.status).to.be.equal(200)
        cy.wrap(response.body.photos).as("photos")
    })
});
Cypress.Commands.add('getPhotos', function (list, type) {
    list[0] = this.photos[0]
    list[1] = this.photos[1]
    list[2] = this.photos[2]
    list[3] = this.photos[3]
    list[4] = this.photos[4]
    list[5] = this.photos[5]
    list[6] = this.photos[6]
    list[7] = this.photos[7]
    list[8] = this.photos[8]
    list[9] = this.photos[9]
    if (type == "sol") {
        cy.task('setPhotoListSol', list);
    }
    if (type == "date") {
        cy.task('setPhotoListdate', list);
    }
})
Cypress.Commands.add('comparePhotos', function () {
    cy.task('getPhotoList').then((photoList) => {
        expect(photoList.sol).to.deep.eq(photoList.date)
    })
})
Cypress.Commands.add('addCuriosityCount', function () {
    cy.task('curiosityPhotoCount', this.photos.length)
    cy.task('getPhotoList').then((photoList) => {
        cy.log(photoList)
    })
})
Cypress.Commands.add('addOtherCount', function () {
    cy.task('addToPhotosCount', this.photos.length)
    cy.task('getPhotoList').then((photoList) => {
        cy.log(photoList)
    })
})
Cypress.Commands.add('compareCounts', function () {
    cy.task('getPhotoList').then((photoList) => {
        let aux = (photoList.otherPhotocount - photoList.curiosityPhotoCount) * 10
        expect(photoList.curiosityPhotoCount).to.be.lessThan(aux)
    })
})

