// © 2022 Bruno Longo <bruno_pereira_longo@hotmail.com>
/// <reference types="cypress" />
const { functionsIn } = require("lodash");

const list = []
describe('Mars Rover Validation', function () {
    before('Before Assumptions', function () {
    })
    it('Retrieve the first 10 Mars photos made by "Curiosity" on 1000 Martian sol', function () {
        const filter = {
            api_key: "DEMO_KEY",
            sol: 1000,
            page: 1
        }
        cy.retrivePhotos(filter, "curiosity")
        cy.getPhotos(list, "sol")
        cy.task('getPhotoList').then((photoList) => {
            cy.log(photoList)
        })
    });
    it('Retrieve the first 10 Mars photos made by "Curiosity" on Earth date equal to 1000 Martian sol', function () {
        const filter = {
            api_key: "DEMO_KEY",
            earth_date: "2015-5-30",
            page: 1
        }
        cy.retrivePhotos(filter, "curiosity")
        cy.getPhotos(list, "date")
        cy.task('getPhotoList').then((photoList) => {
            cy.log(photoList)
        })
    });
    it('Retrieve and compare the first 10 Mars photos made by "Curiosity" on 1000 sol and on Earth date equal to 1000 Martian sol', function () {
        cy.comparePhotos()
    });
    it('Validate that the amounts of pictures that each "Curiosity" camera took on 1000 Mars sol is not greater than 10 times the amount taken by other cameras on the same date.', function () {
        // cy.task('clearPhotoList')
        const cameras = ["FHAZ", "RHAZ", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "MAST"]
        const filterAll = {
            api_key: "DEMO_KEY",
            sol: 1000
        }
        cy.retrivePhotos(filterAll, "curiosity")
        cy.addOtherCount()
        cy.get(cameras).each(function (element) {
            const filterCamera = {
                api_key: "DEMO_KEY",
                sol: 1000,
                camera: element
            }
            cy.retrivePhotos(filterCamera, "curiosity")
            cy.addCuriosityCount()
            cy.compareCounts()
        })
    });
    after('After Assumptions', function () {
        cy.task('clearPhotoList')
    })
})