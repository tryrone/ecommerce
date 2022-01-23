import 'package:flutter/material.dart';
import 'package:food_delivery/constants/colors.dart';
import 'package:food_delivery/models/food.dart';
import 'package:food_delivery/screens/detail/widgets/food_detail.dart';
import 'package:food_delivery/screens/detail/widgets/food_img.dart';
import 'package:food_delivery/widgets/custom_app_bar.dart';

class DetailPage extends StatelessWidget {
  final Food food;

  DetailPage(this.food);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kPrimaryColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            CustomAppBar(
              Icons.arrow_back_ios_outlined,
              Icons.favorite_outline,
              leftCallBack: () {
                Navigator.of(context).pop();
              },
            ),
            FoodImg(food),
            FoodDetail(food)
          ],
        ),
      ),
      floatingActionButton: Container(
        width: 100,
        height: 56,
        child: RawMaterialButton(
          onPressed: (){},
          fillColor: kPrimaryColor,
          shape: RoundedRectangleBorder(
            borderRadius:  BorderRadius.circular(50),
          ),
          elevation:2,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              const Icon(
                Icons.shopping_bag_outlined, 
                size: 30,
                color: Colors.black
                ),
              Container(
                padding: const EdgeInsets.all(15),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle
                ),
                child: Text(
                  food.quantity.toString(), 
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold
                  ),
                  ),
              )
          ],),
        ),
      ),
    );
  }
}
