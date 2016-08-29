/* @flow */

/**
 * Contains a few very hacky functions used to
 * do the thing we gotta do.
 *
 * TODO: Gradually remove shit in this file until its all gone
 */

class HackUtils {
    /**
     * Gets the owner of an element.
     *
     * This is not something react gives away easilly, and
     * only avaiable in internal API's.
     *
     * @param element - The react element
     * @return element - The element that created the given one.
     */
    static getElementOwnerInstance(element: React$Element<>) : React$Component<> {
        return element._owner._instance;
    }


    static getElementInstance(element) : React$Component<> {
        return element._instance;
    }

    static getElementParent(element: React$Element<>) : React$Element<> {
        return element._parent;
    }
}
