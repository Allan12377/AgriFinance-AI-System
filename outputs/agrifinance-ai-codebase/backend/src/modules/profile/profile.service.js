const { randomUUID } = require("crypto");
const { badRequest } = require("../../shared/http-error");

const profile = {
  id: "demo-farmer",
  fullName: "Amina Nakato",
  phoneNumber: "+256700000001",
  email: "amina@example.com",
  district: "Kasese",
  village: "Rukoki",
  cooperativeName: "Kasese Women Farmers Group",
  createdAt: "2026-07-15T08:00:00.000Z",
  updatedAt: "2026-07-15T08:00:00.000Z",
};

const farms = [
  {
    id: "demo-farm-1",
    farmerId: profile.id,
    name: "Rukoki Mixed Farm",
    district: "Kasese",
    acreage: 4.5,
    mainCrop: "Beans",
    createdAt: "2026-07-15T08:10:00.000Z",
  },
  {
    id: "demo-farm-2",
    farmerId: profile.id,
    name: "Kabuga Maize Plot",
    district: "Kasese",
    acreage: 2.25,
    mainCrop: "Maize",
    createdAt: "2026-07-15T08:20:00.000Z",
  },
];

function getProfile() {
  return {
    profile,
    farms: [...farms],
  };
}

function upsertProfile(payload) {
  const cleaned = validateProfile(payload);

  profile.fullName = cleaned.fullName;
  profile.phoneNumber = cleaned.phoneNumber;
  profile.email = cleaned.email;
  profile.district = cleaned.district;
  profile.village = cleaned.village;
  profile.cooperativeName = cleaned.cooperativeName;
  profile.updatedAt = new Date().toISOString();

  return { ...profile };
}

function createFarm(payload) {
  const cleaned = validateFarm(payload);
  const farm = {
    id: randomUUID(),
    farmerId: profile.id,
    ...cleaned,
    createdAt: new Date().toISOString(),
  };

  farms.push(farm);
  return farm;
}

function listFarms() {
  return [...farms].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function validateProfile(payload) {
  const errors = {};
  const fullName = String(payload.fullName || "").trim();
  const phoneNumber = String(payload.phoneNumber || "").trim();
  const email = String(payload.email || "").trim();
  const district = String(payload.district || "").trim();
  const village = String(payload.village || "").trim();
  const cooperativeName = String(payload.cooperativeName || "").trim();

  if (!fullName) {
    errors.fullName = "Farmer full name is required.";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Phone number is required.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  }

  if (!district) {
    errors.district = "District is required.";
  }

  if (!village) {
    errors.village = "Village is required.";
  }

  if (Object.keys(errors).length > 0) {
    throw badRequest("Invalid farmer profile", errors);
  }

  return {
    fullName,
    phoneNumber,
    email,
    district,
    village,
    cooperativeName,
  };
}

function validateFarm(payload) {
  const errors = {};
  const name = String(payload.name || "").trim();
  const district = String(payload.district || "").trim();
  const acreage = Number(payload.acreage);
  const mainCrop = String(payload.mainCrop || "").trim();

  if (!name) {
    errors.name = "Farm name is required.";
  }

  if (!district) {
    errors.district = "District is required.";
  }

  if (!Number.isFinite(acreage) || acreage <= 0) {
    errors.acreage = "Acreage must be greater than zero.";
  }

  if (!mainCrop) {
    errors.mainCrop = "Main crop is required.";
  }

  if (Object.keys(errors).length > 0) {
    throw badRequest("Invalid farm registration", errors);
  }

  return { name, district, acreage, mainCrop };
}

module.exports = {
  createFarm,
  getProfile,
  listFarms,
  upsertProfile,
};
