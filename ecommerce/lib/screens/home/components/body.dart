import 'package:ecommerce/constants.dart';
import 'package:ecommerce/models/Product.dart';
import 'package:ecommerce/screens/details/details_screen.dart';
import 'package:ecommerce/screens/home/components/categories.dart';
import 'package:ecommerce/screens/home/components/item_card.dart';
import 'package:flutter/material.dart';

class Body extends StatelessWidget {

 


  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
          child: Text('Women',
              style: Theme.of(context)
                  .textTheme
                  .headline5
                  ?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const Categories(),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
            child: GridView.builder(
              itemCount: products.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.75,
                mainAxisSpacing: kDefaultPaddin,
                crossAxisSpacing: kDefaultPaddin
              ), 
              itemBuilder: (context, index) => itemCard(
                product: products[index], 
                press:() => Navigator.push(
                  context, 
                  MaterialPageRoute(builder: (context) => 
                  DetailsScreen(products[index])
                  )))
            ),
          ),
        )
      ],
    );
  }
}

