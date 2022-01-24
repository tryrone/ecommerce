import 'package:ecommerce/models/Product.dart';
import 'package:flutter/material.dart';
import '../../../constants.dart';

class Description extends StatelessWidget {
  const Description({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin:  const EdgeInsets.symmetric(vertical: kDefaultPaddin),
      child: Text(
        product.description,
        style: const TextStyle(
          height: 1.5,
        ),
        ));
  }
}

