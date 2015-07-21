+++
author = "Brandon Romano"
date = "2015-04-01T20:17:44-04:00"
tags = ["android"]
title = "Android Code Style Guide"

+++

Adhering to a rigorous style guide is one of the easiest things you can do to make any codebase more maintainable.  Particularly with Android development, this can be pretty tough to nail down as there are a bunch of different components to formalize.  In my experience, projects with more than one developer and without a formalized style guide end up very inconsistent.

Here I provide a sane style guide with all major components that can get you up and running with a style guide for your next project.

## Index

#   ##  ### **

- Java
    - Naming Conventions
        - Packages
        - File
        - Class
        - Constants
        - Non Constants
            - Members
            - Local variables
            - Parameters
        - Generics
    - Package Organization
    - Imports
    - Comments
    - Formatting
        - Indentation
        - Blocks
        - Line Length
        - Wrapping Lines
        - White Space
        - parentheses (over do it)
        - Boolean expressions ( ! )
    - Programming Practices
        - @Override always
        - Handle all exceptions

- XML

- Android specific naming
    - Classes
    - Fragments



# Java

## Naming Conventions <a name="java-naming-conventions"></a>

Before I get into any specifics, I would like to note that ALL naming in Java should be as exact as possible, and you should not concern yourself with the length of naming.  If you can succinctly describe something, then great -- but never prefer a short name over an accurate one.

Naming a variable `mNewYorkMetsRightFieldersGoodLuckGloveSize` is significantly preferred over a variable named `v` (because it gives no indication of what the variable is) and is also better than `mGloveSize` (because it is not specific enough).

### Packages

All package names should consist of only lower case alphabetical characters.  If a package requires multiple words, do not use any delimiter between the words, simply concatenate them together.

**The Base Package:**

In Android, all of your Java code should be within a nested package that follows this structure:

```
com.domain.appname
```

For example, if I was building an application named `My Cool Application` it would have the base package name `com.digitalcitadel.mycoolapplication`.

### Files

All files in Java should be named as their top-level class, with `.java` appended to the end.

For example, if the contents of my file are this:

```java
package com.digitalcitadel.example

public class MyClass {
    // ...
}
```

Then my file should be named `MyClass.java`.

### Classes

Class names should be named in UpperCamelCase.

Some valid examples would be `MyClassName` `AnotherCoolClass`.

### Constants

There isn't an exact keyword in Java to declare something as a constant, but when you intend a value to be constant you should use the `static` and `final` keywords.

It's also generally safe for constants to have a `public` access level, and by convention this should be followed, unless you have a good reason.

All constant fields should be in all caps, with words delimited by an underscore.

Here are some valid constants:

```java
public static final int SIDES_OF_A_SQUARE = 4;
public static final String EXTRA_STATE_SELECTED_POSITION  = "state-selected-position";
```

### Non Constants

**Member Variables**:

Member variables are to be written in camelCase.

Here are some valid member variables:

```java
private int mNumberOfCats;
private String mPersonName = "Bob";
```

Member variables should also always be private with accessor methods if access is required.

**Local Variables**:

Local variables are to be written in camelCase, with no prefixing.

Here are some valid local variables:

```java
int numberOfCats;
String personName = "Bob";
```

**Parameters**:

Parameters are to be written in camelCase, with no prefixing.

Here are some valid parameters:

```java
public void someMethod(int numberOfCats, String personName)
{
    // ...
}
```

### Generics

Generics should be named in UpperCamelCase.

Something worth noting about naming generics should be the fact that they should be descriptively named.

Very frequently I see Java developers fall to this anti-pattern:

```java
public class MyClass<T> {
    // ...
}
```

Where it would be more valuable to see something like this:

```java
public class MyClass<DescriptiveGenericName> {
    // ...
}
```

You'll see good naming of generics in Android's [AsyncTask](http://developer.android.com/reference/android/os/AsyncTask.html), and bad naming in Java's [ArrayList](http://docs.oracle.com/javase/7/docs/api/java/util/ArrayList.html).


## Android Naming Conventions

#### Activities

The Java Class for an activity should always be postfixed with `Activity`.

The XML file representing the View for the activity should be prefixed by `activity`.

For example, an Activity that is being used as a home screen, should have a Java class named `HomeScreenActivity` with an XML view named `activity_home_screen.xml`.

#### Fragments

Fragments follow the same naming convention as Activities.

The Java Class for a fragment should always be postfixed with `Fragment`.

The XML file representing the View for the fragment should be prefixed by `fragment`.

For example, a Fragment that's being used as a footer, should have a Java class named `FooterFragment` with an XML view named `fragment_footer.xml`.

## Package Organization

In all Java development, the package is an invaluable tool that helps keep code organized.  In Android development, these should be used liberally as apps can get rather large in terms of number of files fairly quickly.

The structure of the packages is highly dependent on the source files, but here's an example of the top level packages you may find in your application:

```
com.digitalcitadel.example
    activities   -- Activities + their related files
    components   -- Specific application components, such as push notifications, analytics, etc
    fragments    -- Fragments + their related files
    main         -- Contains application file, and all other application wide files
    net          -- All networking code
    util         -- Utility classes
```

Most of my applications will have more top level packages than noted above, but all of them nest further.

The general rule with packages is if you think you can logically split a package in two, you probably should.

## Imports

I find a lot of Java developers know very little about best practice for imports.  This is because java IDE's handle imports particularly well, leaving developers with very little concern about them.

If you're a developer who uses an IDE's auto import / clean import tools, great!  Keep using them, they follow the best practice I am about to describe.

**Wildcard Imports:**

To begin with, wildcard imports should never be used.  This can lead to conflicts in your local namespace, which is always bad news.

For example, let's say I have a Calendar class in my util package:

```java
import java.util.*;
import com.digitalcitadel.exampleapp.util.*;

// These wildcard statments import these (and a bunch of other) files:
// java.util.Calendar
// com.digitalcitadel.exampleapp.util.Calendar

public class MyClass {

    public MyClass()
    {
        Calendar calendar = new Calendar(); // Won't compile, ambiguous reference
        com.digitalcitadel.exampleapp.util.Calendar calendar = new com.digitalcitadel.exampleapp.util.Calendar(); // Will compile, but please don't do this ever
    }

}
```

Clearly, we're stuck with something that doesn't work and a solution that's really awful.

Stay away from wildcard imports.

**Order Alphabetically**

This is another thing your IDE handles for you, but you should order all imports alphabetically.

**No line-wrapping**

There should be no line wrapping for import statments, regardless of length.

## Comments

You should comment liberally, but not [too liberally](http://blog.codinghorror.com/coding-without-comments/).

**Writing comments:**

The questions I usually answer in comments are the `why's` or `what's`, but rarely ever the `how's`.

The code itself should do a good job at describing how things work, adding comments explaining the how is sometimes just as bad as duplicated code.

In some edge cases, explaining how the code if working is actually extremely valuable.  These are usually the cases where there are bugs in a library you're using, and you need to do some strange workaround.  In these cases, you will most definitely know when to write down how it's working.

**Javadoc Link:**

The Javadoc `{@link}` feature is insanely powerful and useful.  Links allow you to jump to a specific part of the source code fairly effortlessly in both Android Studio + Eclipse.  This also makes your comments more resistant to refactors, as Links will also change during a refactor.

All references to classes/methods should should be accomplished via a `{@link}`.

Links have to be in a `/** */` style comment, so it's a little frustrating to do inline, but is well worth the extra few keystrokes.

**Classes:**

Classes should have a comment above the class declaration describing the purpose of the class.

Best results will be seen when writing out this comment before the class is implemented, as this will help you adhere to the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle).

If you ever realize the initial goal of the class has been changed, a refactor is likely required.

**Methods:**

Frequently, the name of the method accurately describes exactly what the method does, so a comment isn't necessisary.

If you can't describe exactly how a method is implemented from it's declaration, then a comment is necessissary.

## Formatting

#### Indentation

All indentation should be done with four spaces.

#### Blocks

All blocks (with one exception) are to be created with curly braces on their own line.

For example:

```java
if(booleanExpression)
{
    // ...
}
else
{
    // ...
}
```

There is one exception to this rule, and that is for Anonymous Inner Classes.

Anonymous Inner Classes are to have their curly braces on the same line that the new keyword appears.  This puts emphasys on the fact that the implementation of the inner class is also part of the value.

For example:

```java
// As a parameter
mButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view)
    {
        // ...
    }
});

// As a value
View.OnClickListener onClickListener = new View.OnClickListener() {
    @Override
    public void onClick(View view)
    {
        // ...
    }
};
```

#### Line Length

There is no absolute character limit, although try to keep it around 80 characters.

#### Wrapping Lines

When wrapping lines, indent an additional 8 characters in.

Also, keep the operation or comma that links the two lines at the end of the first line to indicate that there is still more on the next line.

Here are two examples:

```java
public static void reallyLongMethodName(String paramOne, String paramTwo,
        String paramThree, String paramFour, String paramFive){
    // ...
}

String myString = "This is a really long string that we shouldn't " +
        "keep on one line";
```

#### White Space

There should be a single space between all operators.

```java
// Don't do this:
int myInt=1;

// Do this:
int myInt = 1;
```

The last character of a line may not be whitespace.


#### Boolean Expressions

Parentheses in boolean expressions should be used liberally to prevent any precedence confusion.

```java
// Don't do this:
if(userIsADog || userHasFourLegs && userBarks)
{
    // ...
}

// Do this:
if(userIsADog || (userHasFourLegs && userBarks))
{
    // ...
}
```

Also, if there is a negation in a boolean expression, there should be a space before and after it to make sure it is not overlooked.

```java
if( ! userIsADog)
{
    // ...
}
```

## Misc. Programming Practices

#### @Override always

While the Java `@Override` keyword is optional, it should still always be used.

### More Javadoc Link

When there is an overridden method, you should also add a link above it to the method that it is overriding.

This gives quick and easy access to the method that is being overridden, which likely has some documentation.

For example:

```java
/** {@link com.digitalcitadel.library.class#method } */
@Override
public void someMethod()
{
    // ...
}
```

