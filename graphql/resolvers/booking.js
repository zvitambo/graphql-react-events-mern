const Booking = require("../../models/booking");
const Event = require("../../models/event");
const {
  transformEvent,
  transformBooking,
} = require("./merge");


module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const event = await Event.findOne({ _id: args.eventId });
      if (event) {
        throw new Error("Event doesn't exist.");
      }

      const booking = new Booking({
        user: req.userId,
        event,
      });
      const result = await booking.save();

      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const booking = await Booking.findById(args.eventId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.eventId });

      return event;
    } catch (err) {
      throw err;
    }
  },
};
