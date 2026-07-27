import 'package:flutter/material.dart';

import 'farm.dart';
import 'farmer_profile.dart';
import 'farmer_profile_repository.dart';

class FarmerProfileScreen extends StatefulWidget {
  const FarmerProfileScreen({super.key});

  @override
  State<FarmerProfileScreen> createState() => _FarmerProfileScreenState();
}

class _FarmerProfileScreenState extends State<FarmerProfileScreen> {
  final FarmerProfileRepository _repository = FarmerProfileRepository();
  final GlobalKey<FormState> _profileFormKey = GlobalKey<FormState>();
  final TextEditingController _fullNameController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _districtController = TextEditingController();
  final TextEditingController _villageController = TextEditingController();
  final TextEditingController _cooperativeController = TextEditingController();
  final GlobalKey<FormState> _farmFormKey = GlobalKey<FormState>();
  final TextEditingController _farmNameController = TextEditingController();
  final TextEditingController _farmDistrictController = TextEditingController();
  final TextEditingController _acreageController = TextEditingController();
  final TextEditingController _mainCropController = TextEditingController();

  late FarmerProfile _profile;
  late List<Farm> _farms;

  @override
  void initState() {
    super.initState();
    _profile = _repository.getProfile();
    _farms = _repository.listFarms();
    _fullNameController.text = _profile.fullName;
    _phoneController.text = _profile.phoneNumber;
    _emailController.text = _profile.email;
    _districtController.text = _profile.district;
    _villageController.text = _profile.village;
    _cooperativeController.text = _profile.cooperativeName;
  }

  @override
  void dispose() {
    _fullNameController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    _districtController.dispose();
    _villageController.dispose();
    _cooperativeController.dispose();
    _farmNameController.dispose();
    _farmDistrictController.dispose();
    _acreageController.dispose();
    _mainCropController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Farmer profile'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text(
              'Farmer profile and farms',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 4),
            Text(
              'Create your profile and register one or more farms.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey.shade700,
                  ),
            ),
            const SizedBox(height: 16),
            _ProfileForm(
              formKey: _profileFormKey,
              fullNameController: _fullNameController,
              phoneController: _phoneController,
              emailController: _emailController,
              districtController: _districtController,
              villageController: _villageController,
              cooperativeController: _cooperativeController,
              onSave: _saveProfile,
            ),
            const SizedBox(height: 16),
            _FarmForm(
              formKey: _farmFormKey,
              farmNameController: _farmNameController,
              farmDistrictController: _farmDistrictController,
              acreageController: _acreageController,
              mainCropController: _mainCropController,
              onSave: _saveFarm,
            ),
            const SizedBox(height: 16),
            _FarmList(farms: _farms),
          ],
        ),
      ),
    );
  }

  void _saveProfile() {
    if (!_profileFormKey.currentState!.validate()) {
      return;
    }

    final profile = FarmerProfile(
      fullName: _fullNameController.text.trim(),
      phoneNumber: _phoneController.text.trim(),
      email: _emailController.text.trim(),
      district: _districtController.text.trim(),
      village: _villageController.text.trim(),
      cooperativeName: _cooperativeController.text.trim(),
    );

    _repository.saveProfile(profile);
    setState(() {
      _profile = profile;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Farmer profile saved locally.')),
    );
  }

  void _saveFarm() {
    if (!_farmFormKey.currentState!.validate()) {
      return;
    }

    final farm = Farm(
      id: DateTime.now().microsecondsSinceEpoch.toString(),
      name: _farmNameController.text.trim(),
      district: _farmDistrictController.text.trim(),
      acreage: double.parse(_acreageController.text),
      mainCrop: _mainCropController.text.trim(),
    );

    _repository.addFarm(farm);
    _farmNameController.clear();
    _farmDistrictController.clear();
    _acreageController.clear();
    _mainCropController.clear();

    setState(() {
      _farms = _repository.listFarms();
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Farm registration saved locally.')),
    );
  }
}

class _ProfileForm extends StatelessWidget {
  const _ProfileForm({
    required this.formKey,
    required this.fullNameController,
    required this.phoneController,
    required this.emailController,
    required this.districtController,
    required this.villageController,
    required this.cooperativeController,
    required this.onSave,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController fullNameController;
  final TextEditingController phoneController;
  final TextEditingController emailController;
  final TextEditingController districtController;
  final TextEditingController villageController;
  final TextEditingController cooperativeController;
  final VoidCallback onSave;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Farmer profile',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: fullNameController,
                decoration: const InputDecoration(labelText: 'Full name'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter your full name' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: phoneController,
                decoration: const InputDecoration(labelText: 'Phone number'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter your phone number' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter your email' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: districtController,
                decoration: const InputDecoration(labelText: 'District'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter your district' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: villageController,
                decoration: const InputDecoration(labelText: 'Village'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter your village' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: cooperativeController,
                decoration: const InputDecoration(labelText: 'Cooperative name'),
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  onPressed: onSave,
                  icon: const Icon(Icons.save_outlined),
                  label: const Text('Save profile'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FarmForm extends StatelessWidget {
  const _FarmForm({
    required this.formKey,
    required this.farmNameController,
    required this.farmDistrictController,
    required this.acreageController,
    required this.mainCropController,
    required this.onSave,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController farmNameController;
  final TextEditingController farmDistrictController;
  final TextEditingController acreageController;
  final TextEditingController mainCropController;
  final VoidCallback onSave;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Register farm',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: farmNameController,
                decoration: const InputDecoration(labelText: 'Farm name'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter a farm name' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: farmDistrictController,
                decoration: const InputDecoration(labelText: 'Farm district'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter farm district' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: acreageController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(labelText: 'Acreage'),
                validator: (value) {
                  final acreage = double.tryParse(value ?? '');
                  if (acreage == null || acreage <= 0) {
                    return 'Enter acreage greater than zero';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: mainCropController,
                decoration: const InputDecoration(labelText: 'Main crop'),
                validator: (value) => value == null || value.trim().isEmpty ? 'Enter the main crop' : null,
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  onPressed: onSave,
                  icon: const Icon(Icons.add_business_outlined),
                  label: const Text('Add farm'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FarmList extends StatelessWidget {
  const _FarmList({required this.farms});

  final List<Farm> farms;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Registered farms',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 8),
            if (farms.isEmpty)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 24),
                child: Center(child: Text('No farms registered yet.')),
              )
            else
              ...farms.map(
                (farm) => ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const CircleAvatar(
                    child: Icon(Icons.agriculture_outlined),
                  ),
                  title: Text(farm.name),
                  subtitle: Text('${farm.mainCrop} • ${farm.acreage.toStringAsFixed(2)} acres • ${farm.district}'),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
