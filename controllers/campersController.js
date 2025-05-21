import pool from "../db.js";

export const getAllCampersFull = async (req, res) => {
  try {
    // campers
    const campersResult = await pool.query("SELECT * FROM campers");
    const campers = campersResult.rows;

    // gallery
    const galleryResult = await pool.query("SELECT * FROM gallery");
    const galleryByCamper = galleryResult.rows.reduce((acc, img) => {
      if (!acc[img.camper_id]) acc[img.camper_id] = [];
      acc[img.camper_id].push({
        thumb: img.thumb,
        original: img.original,
      });
      return acc;
    }, {});

    // reviews
    const reviewsResult = await pool.query("SELECT * FROM reviews");
    const reviewsByCamper = reviewsResult.rows.reduce((acc, review) => {
      if (!acc[review.camper_id]) acc[review.camper_id] = [];
      acc[review.camper_id].push({
        reviewer_name: review.reviewer_name,
        reviewer_rating: review.reviewer_rating,
        comment: review.comment,
      });
      return acc;
    }, {});

    // об'єднати всі дані
    const fullCampers = campers.map((camper) => ({
      id: camper.id.toString(),
      name: camper.name,
      price: camper.price,
      rating: parseFloat(camper.rating),
      location: camper.location,
      description: camper.description,
      form: camper.form,
      length: camper.length,
      width: camper.width,
      height: camper.height,
      tank: camper.tank,
      consumption: camper.consumption,
      transmission: camper.transmission,
      engine: camper.engine,
      AC: camper.ac,
      bathroom: camper.bathroom,
      kitchen: camper.kitchen,
      TV: camper.tv,
      radio: camper.radio,
      refrigerator: camper.refrigerator,
      microwave: camper.microwave,
      gas: camper.gas,
      water: camper.water,
      gallery: galleryByCamper[camper.id] || [],
      reviews: reviewsByCamper[camper.id] || [],
    }));

    res.json(fullCampers);
  } catch (err) {
    console.error("Error fetching full camper data:", err);
    res.status(500).json({ error: "Server error" });
  }
};
