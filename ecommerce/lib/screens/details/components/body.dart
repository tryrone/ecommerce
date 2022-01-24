import 'package:ecommerce/constants.dart';
import 'package:ecommerce/models/Product.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'add_to_cart.dart';
import 'color_and_size.dart';
import 'counter_with_fav_btn.dart';
import 'description.dart';
import 'product_title_with_image.dart';

class Body extends StatelessWidget {
  final Product product;

  Body(this.product);


  Color _colorFromHex(String hexColor) {
      final hexCode = hexColor.replaceAll('#', '');
      return Color(int.parse('FF$hexCode', radix: 16));
    }


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          SizedBox(
            height: size.height,
            child: Stack(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(top: size.height * 0.3),
                  padding: EdgeInsets.only(
                      top: size.height * 0.12,
                      left: kDefaultPaddin,
                      right: kDefaultPaddin),
                  decoration: const BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(24),
                          topRight: Radius.circular(24))),
                  child: Column(
                    children: [
                      ColorAndSize(product: product),
                      const SizedBox(height: kDefaultPaddin/2,),
                      Description(product: product),
                      const SizedBox(height: kDefaultPaddin/2,),
                      const CounterWithFavBtn(),
                      const SizedBox(height: kDefaultPaddin/2,),
                      AddToCart(product: product)
                    ],
                  ),
                ),
                
                
                ProductTitleWithImage(product: product),
              ],
            ),
          ),
        ],
      ),
    );
  }
}


