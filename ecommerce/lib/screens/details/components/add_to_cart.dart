import 'package:ecommerce/models/Product.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import '../../../constants.dart';

class AddToCart extends StatelessWidget {
  const AddToCart({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: kDefaultPaddin),
      child: Row(
        children: [
          Container(
            margin: const EdgeInsets.only(right: kDefaultPaddin),
            height: 50,
            width: 58,
            decoration: BoxDecoration(
              border: Border.all(color: product.color),
              borderRadius: BorderRadius.circular(18)
            ),
            child: IconButton(
              icon: SvgPicture.asset('assets/icons/add_to_cart.svg', color: product.color,),
              onPressed: (){},
              ),
          ),

          Expanded(
            child: SizedBox(
              height: 50,
              child: FlatButton(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                  ),
                color: product.color,
                onPressed: (){},
                child: Text(
                  "Buy Now".toUpperCase(),
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                    color: Colors.white
                  ),
                ),
              ),
            ),
          ),
        
        ],
      ),
    );
  }
}
