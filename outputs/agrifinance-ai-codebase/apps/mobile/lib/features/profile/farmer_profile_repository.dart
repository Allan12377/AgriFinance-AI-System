import 'farm.dart';
import 'farmer_profile.dart';

class FarmerProfileRepository {
  FarmerProfileRepository();

  FarmerProfile _profile = const FarmerProfile(
    fullName: 'Amina Nakato',
    phoneNumber: '+256700000001',
    email: 'amina@example.com',
    district: 'Kasese',
    village: 'Rukoki',
    cooperativeName: 'Kasese Women Farmers Group',
  );

  final List<Farm> _farms = [
    const Farm(
      id: 'demo-farm-1',
      name: 'Rukoki Mixed Farm',
      district: 'Kasese',
      acreage: 4.5,
      mainCrop: 'Beans',
    ),
    const Farm(
      id: 'demo-farm-2',
      name: 'Kabuga Maize Plot',
      district: 'Kasese',
      acreage: 2.25,
      mainCrop: 'Maize',
    ),
  ];

  FarmerProfile getProfile() => _profile;

  List<Farm> listFarms() => [..._farms];

  void saveProfile(FarmerProfile profile) {
    _profile = profile;
  }

  void addFarm(Farm farm) {
    _farms.add(farm);
  }
}
