<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" encoding="utf-8"/>

<!-- global variables -->
<xsl:variable name="key_return">
	<xsl:text>
</xsl:text>
</xsl:variable>

<xsl:variable name="key_tab">
	<xsl:text>	</xsl:text>
</xsl:variable>

<xsl:template match="/">
  <xsl:apply-templates select="/document/documentData/tizen.doc/tizen.page"/>
</xsl:template>

<xsl:template match="tizen.page">
	<xsl:variable name="page_name" select="@id"/>
	<xsl:variable name="class_name">
		<xsl:value-of select="concat('_', $page_name, '_page')"/>
	</xsl:variable>
	<xsl:text>/*******************************************************************************
 * page dynamic loading handler
 * 
 * @Generated by Tizen UI Builder
 * @Attribute managed readonly volatile
 *******************************************************************************/

// page class
/**
*  Object </xsl:text><xsl:value-of select="$class_name"/><xsl:text>()
*  @super _page
*  @constructor
*  @memberOf </xsl:text><xsl:value-of select="$class_name"/><xsl:text> 
*/
function </xsl:text><xsl:value-of select="$class_name"/><xsl:text>() {
}
</xsl:text>

<xsl:text>
//inherit _page
</xsl:text>

<xsl:value-of select="concat($class_name, '.prototype = ')"/>
<xsl:value-of select="concat('new _page(', '&quot;', $page_name, '&quot;);', $key_return)"/>

<xsl:text>
// widget assist
</xsl:text>

<xsl:for-each select=".//*">
<xsl:value-of select="concat($class_name, '.prototype.', @id, ' = ')"/>
<xsl:value-of select="concat('undefined;', $key_return)"/>
</xsl:for-each>


<xsl:text>
// default widget event handler
</xsl:text>

<xsl:for-each select=".//*">
<xsl:for-each select="@*[starts-with(name(), 'on')]">
<xsl:value-of select="concat($class_name, '.prototype.', ., ' = ')"/>
<xsl:value-of select="concat('function(event) {};', $key_return)"/>
</xsl:for-each>
</xsl:for-each>

<xsl:text>
</xsl:text>

<xsl:value-of select="concat($class_name, '.prototype.init_page', ' = ')"/>
<xsl:value-of select="concat('function(isStartPage) {', $key_return)"/>
<xsl:value-of select="concat($key_tab, 'this._init_page(function() {', $key_return)"/>

<xsl:text>
		// widget assist (real object binding)
</xsl:text>

<xsl:for-each select=".//*">

<xsl:text>
		/**
		 * @type jQueryObject
		 */
</xsl:text>
<xsl:value-of select="concat($key_tab, $key_tab, $class_name, '.prototype.', @id, ' = ')"/>
<xsl:value-of select="concat('$(', '&quot;', '#', $page_name, ' ', '#', @id, '&quot;', ');', $key_return)"/>
</xsl:for-each>

<xsl:text>
		// bind widget event handler
</xsl:text>

<xsl:for-each select=".//*">
<xsl:for-each select="@*[starts-with(name(), 'on')]">
<xsl:value-of select="concat($key_tab, $key_tab, $class_name, '.prototype.', ../@id, '.bind(')"/>
<xsl:value-of select="concat('&quot;', substring(name(), 3), '&quot;, ', 'function(event) { ', $class_name, '.prototype.', ., '(event); });', $key_return)"/>
</xsl:for-each>
</xsl:for-each>
<xsl:value-of select="concat($key_return, $key_tab, '}', ', isStartPage);', $key_return)"/>

<xsl:text>
};
</xsl:text>

</xsl:template>
</xsl:stylesheet>
