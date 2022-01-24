import 'package:ecommerce/constants.dart';
import 'package:ecommerce/models/Product.dart';
import 'package:ecommerce/screens/details/components/body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class DetailsScreen extends StatelessWidget {
  final Product product;

  DetailsScreen(this.product);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: product.color,
      appBar: buildAppBar(context),
      body: Body(product),
    );
  }

  AppBar buildAppBar(BuildContext context) {
    return AppBar(
      backgroundColor: product.color,
      elevation: 0,
      leading: IconButton(
        icon: SvgPicture.asset('assets/icons/back.svg', 
        color: Colors.white
        ), 
        onPressed: ()=> Navigator.pop(context)
        ),
      actions: <Widget>[
        IconButton(
          onPressed: (){}, 
          icon: SvgPicture.asset('assets/icons/search.svg',color: Colors.white)
          ),
        IconButton(
          onPressed: (){}, 
          icon: SvgPicture.asset('assets/icons/cart.svg',color: Colors.white)
          ),
        const SizedBox(width: kDefaultPaddin / 2,)
      ],
    );
  }
}
