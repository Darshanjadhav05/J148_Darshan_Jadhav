package com.trg.AutoWire;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

@Component
class Apple{
	public Apple() {
		System.out.println("Apple bean instatiated");
	}
	public void printFruitName() {
		System.out.println("Apple");
	}
}

@Component
class Mango{
	public Mango() {
		System.out.println("Mango bean instatiated");
	}
	public void printFruitName() {
		System.out.println("Mango");
	}
}

@Component("fapp")
public class FruitApplication {

	@Autowired
	Apple apple;
	@Autowired
	Mango mango;
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext("com.trg.AutoWire");
		
		FruitApplication demo = (FruitApplication) context.getBean("fapp");
		demo.apple.printFruitName();
		demo.mango.printFruitName();

	}

}
