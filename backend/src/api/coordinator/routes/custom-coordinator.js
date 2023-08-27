module.exports = {
    routes: [
        {
            method: "GET",
            path: "/coordinators/year/:year",
            handler: "coordinator.findByYear"
        },
    ]
}