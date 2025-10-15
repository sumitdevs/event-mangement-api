import { Router } from "express";

import { 
    addEvent,
    fetchAllEvents,
    getEventDetails,
    updateEventDetails,
    deleteEvent,
    registerForEvent,
    getEventStats,
    listUpcomingEvents,
    cancelUserRegistration,
    fetchAllEventsWithUsers,
 } from "../controllers/event.controller.js";

 const router = Router();

 router.post('/',addEvent);
 router.get('/',fetchAllEvents);
 router.patch('/:id',updateEventDetails);
 router.post('/register',registerForEvent);
 router.get('/stats/:id',getEventStats);
 router.get('/upcoming',listUpcomingEvents);
 router.delete('/cancel',cancelUserRegistration);
 router.delete('/:id',deleteEvent);
 router.get('/all',fetchAllEventsWithUsers);
 router.get('/:id',getEventDetails);


 export default router;
