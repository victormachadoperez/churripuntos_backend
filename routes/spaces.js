const express = require('express');
const router = express.Router();

const spacesController = require('../controller/spacesController');

// Space CRUD
router.route('/')
    .post(spacesController.createSpace)

// Space CRUD
router.route( '/:spaceId')
    .get(spacesController.getSpace)
    .put(spacesController.updateSpacename)
    .delete(spacesController.deleteSpace);

// Users CRUD
router.route( '/:spaceId/users')
    .get(spacesController.getSpaceUsers)
    .put(spacesController.joinSpace)

router.route( '/:spaceId/users/:userId')
    .delete(spacesController.leaveSpace);

// Admins CRUD
router.route('/:spaceId/admins')
    // .get(spacesController.getSpaceAdmins)
    .post(spacesController.createAdmin)

router.route('/:spaceId/admins/:userId')
    .delete(spacesController.deleteAdmin);

// Tasks CRUD
router.route('/:spaceId/tasks')
    .get(spacesController.getTasks)
    .post(spacesController.createTask)
    .put(spacesController.updateTask);

router.route('/:spaceId/tasks/:taskId')
    .delete(spacesController.deleteTask);

// Activities CRUD
router.route('/:spaceId/activities')
    .get(spacesController.getActivities)
    .post(spacesController.createActivity);

router.route('/:spaceId/activities/:activityId')
    .delete(spacesController.deleteActivity);

module.exports = router;